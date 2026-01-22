# 🏦 Banking Management System

A full-stack banking web application built using **React.js**, **Java Spring Boot**, and **Docker SQL**.  
This project simulates real-world banking operations including secure transactions, UPI-based transfers, and downloadable transaction statements.

---

## 🚀 Tech Stack

### Frontend
- React.js  
- Axios  
- Tailwind CSS  

### Backend
- Java Spring Boot  
- Spring Security  
- RESTful APIs  
- JPA / Hibernate  

### Database
- MySQL (Dockerized)

### Tools
- Docker  
- Git  
- Maven  

---

## ✨ Features

### 👤 User Operations
- Deposit money  
- Withdraw money  
- View current account balance  
- View last transaction  
- View complete transaction history  

### 💸 Money Transfer
- Unique UPI ID generated for each user  
- Random numeric suffix added to UPI ID  
- Transfer money between users using UPI ID  
- Secure balance update mechanism  

### 📄 Transaction Management
- View all debit and credit transactions  
- Timestamp-based transaction tracking  
- Download transaction history as **PDF statement**  

---

## 🧠 System Architecture

React.js (Frontend)
|
| REST APIs
v
Spring Boot (Backend)
|
| JPA / Hibernate
v
Dockerized MySQL Database

yaml
Copy code

---

## 🏗️ Backend Architecture

- Controller Layer  
- Service Layer  
- Repository Layer  
- DTO-based request and response handling  
- Centralized exception management  

---

## 🐳 Docker Database Setup

```bash
docker run --name banking-db \
-e MYSQL_ROOT_PASSWORD=root \
-e MYSQL_DATABASE=banking_db \
-p 3306:3306 \
-d mysql:8
⚙️ Local Setup Instructions
1️⃣ Clone Repository
bash
Copy code
git clone https://github.com/your-username/banking-management-system.git
cd bankingProject
2️⃣ Backend Setup (Spring Boot)
bash
Copy code
cd backend
mvn clean install
mvn spring-boot:run
Backend runs at:

arduino
Copy code
http://localhost:8080
3️⃣ Frontend Setup (React)
bash
Copy code
cd frontend
npm install
npm start
Frontend runs at:

arduino
Copy code
http://localhost:3000


📸 Screenshots
arduino
Copy code
/screenshots
 ├── dashboard.png
 ├── transfer.png
 ├── transactions.png
 └── pdf-statement.png


🚧 Deployment Status
Currently configured for local development using Docker and Spring Boot.

Application is deployment-ready and can be hosted on:

nginx
Copy code
AWS EC2
Railway
Render
Azure App Service
🔮 Future Enhancements
Role-based authentication

Email transaction alerts

Monthly statement generation

Admin dashboard

Cloud deployment

👨‍💻 Author
Ella Lakshman

GitHub: https://github.com/Laxman2546

LinkedIn: https://linkedin.com/in/lakshman-25l46
