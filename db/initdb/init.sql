CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    accountnumber BIGINT NOT NULL UNIQUE,
    pin INT NOT NULL,
    valid VARCHAR(10) NOT NULL,
    cvv INT NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_account BIGINT,
    receiver_account BIGINT,
    amount DECIMAL(10,2) NOT NULL,
    transaction_type ENUM('deposit', 'transfer') NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    balance DECIMAL(10,2) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
