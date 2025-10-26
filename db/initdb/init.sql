CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    accountnumber BIGINT NOT NULL,
    pin INT NOT NULL,
    valid INT NOT NULL
    cvv INT NOT NULL,
);

INSERT INTO users (name, accountnumber, pin,valid,cvv) VALUES
('Ella Lakshman', 1234567891234567, 2004,122, 7123, ),
('E Vandana', 1234568888888888, 2004,122, 7456, ),
('E Suryaprakash', 1234567777777777,7892, 212, 7004, );
