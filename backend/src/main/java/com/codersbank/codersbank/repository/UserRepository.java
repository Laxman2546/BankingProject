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
        String sql = "SELECT id, name FROM users";
        return jdbcTemplate.query(sql, (rs, rowNum) ->
                new UserModel(rs.getInt("id"), rs.getString("name")));
    }
}
