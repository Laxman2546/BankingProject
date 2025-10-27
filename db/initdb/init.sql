CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    accountnumber BIGINT NOT NULL,
    pin INT NOT NULL,
    valid VARCHAR(10) NOT NULL,
    cvv INT NOT NULL
);

INSERT INTO users (name, accountnumber, pin, valid, cvv) VALUES
('Ella Lakshman', 1234567891234567, 2004, '1227', 7123),
('E Vandana', 1234568888888888, 2004, '1227', 7456),
('E Suryaprakash', 1234567777777777, 7892, '1228', 7004);
