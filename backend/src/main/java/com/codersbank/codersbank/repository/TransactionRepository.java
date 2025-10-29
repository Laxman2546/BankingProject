package com.codersbank.codersbank.repository;

import com.codersbank.codersbank.models.UserModel;
import com.codersbank.codersbank.models.TransactionModel;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;
@Repository
public class TransactionRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

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
            VALUES (?, ?, ?, 'deposit', ?)
        """;
        jdbcTemplate.update(insertSql, accountNumber, amount, newBalance, userId);

        return "Deposit successful! New balance: ₹" + newBalance;
    }
            public TransactionModel getbalance(int id){
                String sql  = "SELECT * FROM transactions WHERE user_id = ?";
                return jdbcTemplate.queryForObject(sql,new Object[]{id},
                (rs, rowNum) -> new TransactionModel(
            rs.getInt("id"),
            rs.getInt("sender_account"),
            rs.getInt("receiver_account"),
            rs.getDouble("amount"),
            rs.getString("transaction_date"),
            rs.getString("transaction_type"),
            rs.getDouble("balance")
)
        );
    }
}
