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
    public String transfer(Long senderAccountNumber, String upiId, double amount) {
        String findUserSql = "SELECT id FROM users WHERE accountnumber = ?";
        List<Map<String, Object>> users = jdbcTemplate.queryForList(findUserSql, senderAccountNumber);
        if (users.isEmpty()) {
            return "Sender account not found!";
        }
        int senderId = ((Number) users.get(0).get("id")).intValue();

        String findReceiverUserSql = "SELECT user_id FROM transactions WHERE upi_id = ? ORDER BY id ASC LIMIT 1";
        List<Integer> receiverIds = jdbcTemplate.query(findReceiverUserSql, new Object[]{upiId}, (rs, rowNum) -> rs.getInt("user_id"));

        if (receiverIds.isEmpty()) {
            return "Receiver not found!";
        }
        int receiverId = receiverIds.get(0);

        if (senderId == receiverId) {
            return "You cannot send money to your own UPI ID!";
        }

        String findReceiverAccountSql = "SELECT accountnumber FROM users WHERE id = ?";
        List<Long> receiverAccountNumbers = jdbcTemplate.query(findReceiverAccountSql, new Object[]{receiverId}, (rs, rowNum) -> rs.getLong("accountnumber"));
        if (receiverAccountNumbers.isEmpty()) {
            return "Receiver account number not found!";
        }
        Long receiverAccountNumber = receiverAccountNumbers.get(0);


        String lastBalanceSql = "SELECT balance FROM transactions WHERE user_id = ? ORDER BY id DESC LIMIT 1";
        List<Double> senderBalances = jdbcTemplate.query(lastBalanceSql, new Object[]{senderId},
                (rs, rowNum) -> rs.getDouble("balance"));

        double senderLastBalance = senderBalances.isEmpty() ? 0.0 : senderBalances.get(0);

        if (senderLastBalance < amount) {
            return "Insufficient balance!";
        }

        List<Double> receiverBalances = jdbcTemplate.query(lastBalanceSql, new Object[]{receiverId},
                (rs, rowNum) -> rs.getDouble("balance"));
        double receiverLastBalance = receiverBalances.isEmpty() ? 0.0 : receiverBalances.get(0);

        double senderNewBalance = senderLastBalance - amount;
        double receiverNewBalance = receiverLastBalance + amount;

        String debitSql = """
            INSERT INTO transactions (sender_account, receiver_account, amount, transaction_type, balance, user_id, upi_id)
            VALUES (?, ?, ?, 'debit', ?, ?, ?)
        """;
        jdbcTemplate.update(debitSql, senderAccountNumber, receiverAccountNumber, amount, senderNewBalance, senderId, null);

        String creditSql = """
            INSERT INTO transactions (sender_account, receiver_account, amount, transaction_type, balance, user_id, upi_id)
            VALUES (?, ?, ?, 'credit', ?, ?, ?)
        """;
        jdbcTemplate.update(creditSql, senderAccountNumber, receiverAccountNumber, amount, receiverNewBalance, receiverId, null);

        return "Transfer successful! New balance: ₹" + senderNewBalance;
    }

    public List<TransactionModel> getTransactions(Long accountNumber) {
        String findUserSql = "SELECT id FROM users WHERE accountnumber = ?";
        List<Map<String, Object>> users = jdbcTemplate.queryForList(findUserSql, accountNumber);
    
        if (users.isEmpty()) {
            return List.of();
        }
    
        int userId = ((Number) users.get(0).get("id")).intValue();
    
        String transactionsSql = "SELECT * FROM transactions WHERE user_id = ? ORDER BY id DESC";
        List<TransactionModel> transactions = jdbcTemplate.query(transactionsSql, new Object[]{userId},
            (rs, rowNum) -> {
                java.sql.Timestamp timestamp = rs.getTimestamp("transaction_date");
                String formattedDate = new java.text.SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(timestamp);
                return new TransactionModel(
                    rs.getInt("id"),
                    rs.getLong("sender_account"),
                    rs.getLong("receiver_account"),
                    rs.getDouble("amount"),
                    formattedDate,
                    rs.getString("transaction_type"),
                    rs.getDouble("balance"),
                    rs.getString("upi_id")
                );
            });
    
        return transactions;
    }
}
