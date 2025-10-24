-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS codersbank;

-- Use the database
USE codersbank;

-- Create 'users' table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Insert sample data
INSERT INTO users (name) VALUES 
('Ella Lakshman'),
('E Vandana'),
('E Suryaprakash');
