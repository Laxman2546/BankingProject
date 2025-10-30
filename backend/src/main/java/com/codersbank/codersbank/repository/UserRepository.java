package com.codersbank.codersbank.repository;

import com.codersbank.codersbank.models.UserModel;
import com.codersbank.codersbank.repository.TransactionRepository;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.*;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Autowired
    private TransactionRepository transactionService;

    public List<UserModel> getAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new UserModel(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getLong("accountnumber"),
                        rs.getInt("pin"),
                        rs.getString("valid"),
                        rs.getInt("cvv")
                ));
    }

    public UserModel getUserById(int id) {
        String sql  = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id},
                (rs, rowNum) -> new UserModel(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getLong("accountnumber"),
                        rs.getInt("pin"),
                        rs.getString("valid"),
                        rs.getInt("cvv")
                ));
    }

    public Map<String, Object> addUser(UserModel user) {
        String sql = "INSERT INTO users(name, accountnumber, pin, valid, cvv) VALUES (?, ?, ?, ?, ?)";
        int result = jdbcTemplate.update(sql, user.getName(), user.getAccountNumber(), user.getPin(), user.getValid(), user.getCvv());

        if (result > 0) {
            String findUserSql = "SELECT id FROM users WHERE accountnumber = ?";
            Integer userId = jdbcTemplate.queryForObject(findUserSql, Integer.class, user.getAccountNumber());

           String upiId =  transactionService.createAccountTransaction(user.getAccountNumber(), user.getName());

            String fetchSql = "SELECT * FROM users WHERE name = ? AND pin = ?";
            List<UserModel> fetchedUsers = jdbcTemplate.query(fetchSql, new Object[]{user.getName(), user.getPin()},
                    (rs, rowNum) -> new UserModel(
                            rs.getInt("id"),
                            rs.getString("name"),
                            rs.getLong("accountnumber"),
                            rs.getInt("pin"),
                            rs.getString("valid"),
                            rs.getInt("cvv")
                    ));
            UserModel createdUser = fetchedUsers.isEmpty() ? (UserModel)null : fetchedUsers.get(0);
            
            Map<String, Object> response = new java.util.HashMap<>();
            response.put("user", createdUser);
            response.put("upiId", upiId);
            return response;
        } else {
            return null;
        }
    }

public Map<String, Object> findUser(UserModel user) {
    String sql = "SELECT * FROM users WHERE name = ? AND pin = ?";
    List<UserModel> users = jdbcTemplate.query(sql, new Object[]{user.getName(), user.getPin()},
            (rs, rowNum) -> new UserModel(
                    rs.getInt("id"),
                    rs.getString("name"),
                    rs.getLong("accountnumber"),
                    rs.getInt("pin"),
                    rs.getString("valid"),
                    rs.getInt("cvv")
            ));

    if (users.isEmpty()) {
        return null; 
    }

    UserModel foundUser = users.get(0);
    String upiSql = "SELECT upi_id FROM transactions WHERE user_id = ? ORDER BY id ASC LIMIT 1";
    List<String> upiIds = jdbcTemplate.query(upiSql, new Object[]{foundUser.getId()},
            (rs, rowNum) -> rs.getString("upi_id"));

    String upiId = upiIds.isEmpty() ? null : upiIds.get(0);

    Map<String, Object> response = new HashMap<>();
    response.put("user", foundUser);
    response.put("upiId", upiId);

    return response;
}

}
