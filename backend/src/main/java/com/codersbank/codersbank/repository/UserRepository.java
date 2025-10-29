package com.codersbank.codersbank.repository;

import com.codersbank.codersbank.models.UserModel;
import org.springframework.stereotype.Repository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<UserModel> getAllUsers() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new UserModel(rs.getInt("id"), rs.getString("name"),rs.getLong("accountnumber"),rs.getInt("pin"),rs.getString("valid"),rs.getInt("cvv")));
    }
    public UserModel getUserById(int id){
        String sql  = "SELECT * FROM users WHERE id = ?";
        return jdbcTemplate.queryForObject(sql,new Object[]{id},
        (rs,rownum) -> new UserModel(rs.getInt("id"), rs.getString("name"), rs.getLong("accountnumber"), rs.getInt("pin"), rs.getString("valid"), rs.getInt("cvv")));
    }

public UserModel addUser(UserModel user) {
    String sql = "INSERT INTO users(name, accountnumber, pin, valid, cvv) VALUES (?, ?, ?, ?, ?)";
    int result = jdbcTemplate.update(sql, user.getName(), user.getAccountNumber(), user.getPin(), user.getValid(), user.getCvv());

    if (result > 0) {
        String fetchSql = "SELECT * FROM users WHERE name = ? AND pin = ?";
        return jdbcTemplate.queryForObject(fetchSql, new Object[]{user.getName(), user.getPin()},
                (rs, rowNum) -> new UserModel(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getLong("accountnumber"),
                        rs.getInt("pin"),
                        rs.getString("valid"),
                        rs.getInt("cvv")
                ));
    } else {
        return null;
    }
}

    public UserModel findUser(UserModel user){
        String sql = "SELECT * FROM users WHERE name = ? AND pin = ?";
        return jdbcTemplate.queryForObject(sql,new Object[]{user.getName(),user.getPin()},
        (rs,rownum) -> new UserModel(rs.getInt("id"), rs.getString("name"), rs.getLong("accountnumber"), rs.getInt("pin"), rs.getString("valid"), rs.getInt("cvv")));
    }


}
