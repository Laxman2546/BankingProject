# 🏦 Banking Management System

A comprehensive full-stack banking application that provides secure account management, UPI-based money transfers, and transaction tracking with PDF statement generation.

![Tech Stack](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-Spring%20Boot-6DB33F?logo=spring&logoColor=white)
![Database](https://img.shields.io/badge/Database-MySQL-4479A1?logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Containerization-Docker-2496ED?logo=docker&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Docker Configuration](#-docker-configuration)
- [Usage](#-usage)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## ✨ Features

### 👤 Account Management
- **Create Account**: Register with unique user credentials
- **Profile Management**: View and update account details
- **Balance Inquiry**: Real-time account balance checking

### 💰 Transaction Operations
- **Deposit Money**: Add funds to your account
- **Withdraw Money**: Secure cash withdrawal with balance validation
- **UPI Transfer**: Transfer money using unique UPI IDs
- **Transaction History**: View complete debit/credit transaction logs
- **Last Transaction**: Quick view of most recent activity

### 🧾 Statement Generation
- **Transaction Filtering**: Filter by date range, type (debit/credit)
- **PDF Download**: Generate and download transaction statements
- **Detailed Records**: Timestamp-based transaction tracking

### 🔒 Security Features
- Password encryption
- Session management
- Request validation
- SQL injection prevention
- CORS configuration

---

## 🛠 Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **React.js** | UI framework for building interactive interfaces |
| **Axios** | HTTP client for API communication |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **React Router** | Client-side routing |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Java Spring Boot** | RESTful API development |
| **Spring Data JPA** | Database interaction layer |
| **Hibernate** | ORM for entity mapping |
| **Maven** | Dependency management |

### Database
| Technology | Purpose |
|-----------|---------|
| **MySQL 8** | Relational database |
| **Docker** | Database containerization |

### Development Tools
- Git for version control
- Postman for API testing
- Docker Desktop for container management

---

## 🏗 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Browser                          │
│                    (React.js App)                            │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/HTTPS
                       │ REST API Calls
                       ↓
┌─────────────────────────────────────────────────────────────┐
│                  Spring Boot Server                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Controller   │→ │  Service     │→ │ Repository   │      │
│  │   Layer      │  │   Layer      │  │   Layer      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└──────────────────────┬──────────────────────────────────────┘
                       │ JPA/Hibernate
                       │ JDBC
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              MySQL Database (Docker)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────┐          │
│  │  Users   │  │ Accounts │  │  Transactions    │          │
│  └──────────┘  └──────────┘  └──────────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Comes with Node.js
- **Java JDK** (v17 or higher) - [Download](https://www.oracle.com/java/technologies/downloads/)
- **Maven** (v3.8+) - [Download](https://maven.apache.org/download.cgi)
- **Docker Desktop** - [Download](https://www.docker.com/products/docker-desktop/)
- **Git** - [Download](https://git-scm.com/downloads)

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Laxman2546/BankingProject.git
cd BankingProject
```

### 2️⃣ Database Setup with Docker

Start the MySQL container:

```bash
docker-compose up -d
```

Or manually run:

```bash
docker run --name banking-mysql \
  -e MYSQL_ROOT_PASSWORD=root \
  -e MYSQL_DATABASE=banking_db \
  -e MYSQL_USER=banking_user \
  -e MYSQL_PASSWORD=banking123 \
  -p 3306:3306 \
  -d mysql:8
```

Verify the database is running:

```bash
docker ps
```

### 3️⃣ Backend Setup (Spring Boot)

Navigate to the backend directory:

```bash
cd backend
```

Update `application.properties` with your database credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/banking_db
spring.datasource.username=banking_user
spring.datasource.password=banking123
spring.jpa.hibernate.ddl-auto=update
```

Build and run the application:

```bash
# Using Maven
mvn clean install
mvn spring-boot:run

# Or using the wrapper
./mvnw spring-boot:run
```

The backend server will start at: `http://localhost:8080`

### 4️⃣ Frontend Setup (React)

Open a new terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the frontend directory:

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

Start the development server:

```bash
npm start
```

The frontend will open at: `http://localhost:3000`

---

## 🔌 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| POST | `/api/auth/logout` | User logout |

### Account Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/account/balance` | Get current balance |
| GET | `/api/account/details` | Get account details |
| PUT | `/api/account/update` | Update account info |

### Transactions
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/transaction/deposit` | Deposit money |
| POST | `/api/transaction/withdraw` | Withdraw money |
| POST | `/api/transaction/transfer` | UPI transfer |
| GET | `/api/transaction/history` | Get all transactions |
| GET | `/api/transaction/last` | Get last transaction |
| GET | `/api/transaction/statement` | Download PDF statement |

---

## 🗄 Database Schema

### Users Table
```sql
CREATE TABLE users (
    user_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Accounts Table
```sql
CREATE TABLE accounts (
    account_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    upi_id VARCHAR(100) UNIQUE NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    account_id BIGINT NOT NULL,
    transaction_type ENUM('DEBIT', 'CREDIT') NOT NULL,
    amount DECIMAL(15,2) NOT NULL,
    description VARCHAR(255),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id)
);
```

---

## 🐳 Docker Configuration

The project includes a `docker-compose.yml` for easy setup:

```yaml
version: '3.8'
services:
  mysql:
    image: mysql:8
    container_name: banking-mysql
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: banking_db
      MYSQL_USER: banking_user
      MYSQL_PASSWORD: banking123
    ports:
      - "3306:3306"
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

---

## 💡 Usage

### Creating an Account
1. Navigate to the registration page
2. Fill in your details (username, email, password)
3. A unique UPI ID will be generated automatically
4. Submit the form to create your account

### Making a Deposit
1. Login to your account
2. Go to "Deposit" section
3. Enter the amount to deposit
4. Confirm the transaction

### Transferring Money
1. Navigate to "Transfer" section
2. Enter recipient's UPI ID
3. Enter transfer amount
4. Confirm and complete the transfer

### Downloading Statement
1. Go to "Transaction History"
2. Select date range (optional)
3. Click "Download PDF Statement"
4. Statement will be downloaded to your device

---

## 🔮 Future Enhancements

- [ ] Role-based access control (Admin/User)
- [ ] Email notifications for transactions
- [ ] SMS alerts via Twilio
- [ ] Two-factor authentication (2FA)
- [ ] Loan management system
- [ ] Fixed deposit/recurring deposit features
- [ ] Credit card integration
- [ ] Mobile app (React Native)
- [ ] Cloud deployment (AWS/Azure)
- [ ] Real-time notifications using WebSockets

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ella Lakshman**

- GitHub: [@Laxman2546](https://github.com/Laxman2546)
- LinkedIn: [lakshman-25l46](https://linkedin.com/in/lakshman-25l46)
- Email: ellalakshman4@gmail.com

---

## 🙏 Acknowledgments

- Spring Boot documentation
- React.js community
- Docker community
- All contributors who helped in this project

---

## 📞 Support

If you have any questions or need help, please:
- Open an issue in this repository
- Contact via LinkedIn
- Email at ellalakshman4@gmail.com

---

<div align="center">
  
⭐️ If you find this project useful, please give it a star!

Made with ❤️ by Ella Lakshman

</div>
