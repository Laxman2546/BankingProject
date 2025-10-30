package com.codersbank.codersbank.repository;

import com.codersbank.codersbank.models.UserModel;
import com.codersbank.codersbank.models.TransactionModel;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.UUID;
import java.util.List;
import java.util.Map;
@Repository
public class TransactionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
       public String generateUpiId(String name){
        String randomPart = UUID.randomUUID().toString().replaceAll("[^0-9]", "").substring(0, 4);
        String cleanName = name.toLowerCase().replaceAll("\\s+","");
        return cleanName+randomPart+"@codersbank";
    }
 public String createAccountTransaction(Long accountNumber, String name) {
    String findUserSql = "SELECT id FROM users WHERE accountnumber = ?";
    List<Map<String, Object>> users = jdbcTemplate.queryForList(findUserSql, accountNumber);

    if (users.isEmpty()) {
        return "User not found!";
    }

    int userId = ((Number) users.get(0).get("id")).intValue();

    String findUpi = "SELECT upi_id FROM transactions WHERE user_id = ? ORDER BY id ASC LIMIT 1";
    List<String> upiIds = jdbcTemplate.query(findUpi, new Object[]{userId},
            (rs, rowNum) -> rs.getString("upi_id"));

    String upiId;

    if (upiIds.isEmpty()) {
        upiId = generateUpiId(name);
    } else {
        upiId = upiIds.get(0);
    }

    String insertSql = """
        INSERT INTO transactions (receiver_account, amount, balance, transaction_type, user_id, upi_id)
        VALUES (?, 0.0, 0.0, 'created', ?, ?)
    """;
    jdbcTemplate.update(insertSql, accountNumber, userId, upiId);

    return upiId;
}





    public String deposit(Long accountNumber, double amount) {
        String findUserSql = "SELECT id FROM users WHERE accountnumber = ?";
        List<Map<String, Object>> users = jdbcTemplate.queryForList(findUserSql, accountNumber);

        if (users.isEmpty()) {
            return "Account not found!";
        }

        int userId = ((Number) users.get(0).get("id")).intValue();
        String lastBalanceSql = "SELECT balance FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 1";
        List<Double> balances = jdbcTemplate.query(lastBalanceSql, new Object[]{userId},
                (rs, rowNum) -> rs.getDouble("balance"));

        double lastBalance = balances.isEmpty() ? 0.0 : balances.get(0); 
        double newBalance = lastBalance + amount;

        String insertSql = """
            INSERT INTO transactions (receiver_account, amount, balance, transaction_type, user_id)
            VALUES (?, ?, ?, 'deposit', ? )
        """;
        jdbcTemplate.update(insertSql, accountNumber, amount, newBalance, userId);

        return "Deposit successful! New balance: ₹" + newBalance;
    }
    public String withdraw(Long accountNumber, double amount) {
        String findUserSql = "SELECT id FROM users WHERE accountnumber = ?";
        List<Map<String, Object>> users = jdbcTemplate.queryForList(findUserSql, accountNumber);

        if (users.isEmpty()) {
            return "Account not found!";
        }

        int userId = ((Number) users.get(0).get("id")).intValue();
        String lastBalanceSql = "SELECT balance FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 1";
        List<Double> balances = jdbcTemplate.query(lastBalanceSql, new Object[]{userId},
                (rs, rowNum) -> rs.getDouble("balance"));

        double lastBalance = balances.isEmpty() ? 0.0 : balances.get(0); 
        double newBalance = lastBalance - amount;

        String insertSql = """
            INSERT INTO transactions (receiver_account, amount, balance, transaction_type, user_id)
            VALUES (?, ?, ?, 'withdraw', ?)
        """;
        jdbcTemplate.update(insertSql, accountNumber, amount, newBalance, userId);
        return "withdraw successful! New balance: ₹" + newBalance;
    }
            public TransactionModel getbalance(int id){
                String sql  = "SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 1";
                List<TransactionModel> transactions = jdbcTemplate.query(sql,new Object[]{id},
                (rs, rowNum) -> new TransactionModel(
            rs.getInt("id"),
            rs.getLong("sender_account"),
            rs.getLong("receiver_account"),
            rs.getDouble("amount"),
            rs.getString("transaction_date"),
            rs.getString("transaction_type"),
            rs.getDouble("balance"),
            rs.getString("upi_id")
));
        return transactions.isEmpty() ? null : transactions.get(0);
    }


}
