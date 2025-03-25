# User Authentication System

A full-stack user authentication system with role-based access control (Admin and Customer) built using React.js, Node.js, and MySQL.

## Features

- _User Registration_

  - Customer Registration
  - Admin Registration
  - Email Verification
  - Password Hashing
  - Form Validation

- _Authentication_

  - JWT-based Authentication
  - Secure Login
  - Role-based Access Control
  - Protected Routes

- _Admin Dashboard_
  - Modern UI with Material-UI
  - Statistics Overview
  - Recent Activity
  - Quick Actions
  - User Profile Management

## Tech Stack

### Frontend

- React.js
- Material-UI
- React Router
- Axios
- JWT Authentication

### Backend

- Node.js
- Express.js
- MySQL
- JWT
- Nodemailer
- bcryptjs

1 Install backend dependencies:
bash
cd server
npm install

2 Install frontend dependencies:
bash
cd ../client
npm install

4. Set up the database:

- Create a MySQL database
- Import the database schema from server/database.sql

5. Configure environment variables:
   Create a .env file in the server directory with the following variables:
   env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=user_auth_db
   JWT_SECRET=your_jwt_secret_key
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_email_app_password
   FRONTEND_URL=http://localhost:3000
   PORT=5000

## Database Schema

### Users Table Structure

+--------------------+--------------------------+------+-----+---------------------+-------------------------------+
| Field | Type | Null | Key | Default | Extra |
+--------------------+--------------------------+------+-----+---------------------+-------------------------------+
| id | int(11) | NO | PRI | NULL | auto_increment |
| first_name | varchar(50) | NO | | NULL | |
| last_name | varchar(50) | NO | | NULL | |
| email | varchar(100) | NO | UNI | NULL | |
| password | varchar(255) | NO | | NULL | |
| role | enum('customer','admin') | NO | | NULL | |
| email_verified | tinyint(1) | YES | | 0 | |
| verification_token | varchar(255) | YES | | NULL | |
| created_at | timestamp | NO | | current_timestamp() | |
| updated_at | timestamp | NO | | current_timestamp() | on update current_timestamp() |
+--------------------+--------------------------+------+-----+---------------------+-------------------------------+

### Table Description

- id: Auto-incrementing primary key
- first_name: User's first name (required)
- last_name: User's last name (required)
- email: Unique email address (required)
- password: Hashed password (required)
- role: User role enum ('customer' or 'admin')
- email_verified: Boolean flag for email verification (default: false)
- verification_token: Token for email verification
- created_at: Timestamp of user creation (auto-set)
- updated_at: Timestamp of last update (auto-updated)

### SQL Commands to Create Database and Table

sql
-- Create database
CREATE DATABASE IF NOT EXISTS user_auth_db;
USE user_auth_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
role ENUM('customer', 'admin') NOT NULL,
email_verified BOOLEAN DEFAULT FALSE,
verification_token VARCHAR(255),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

## Running the Application

1. Start the backend server:
   bash
   cd server
   npm start

2. Start the frontend development server:
   bash
   cd client
   npm start

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## API Endpoints

### Authentication

- POST /api/auth/register/customer - Register a new customer
- POST /api/auth/register/admin - Register a new admin
- POST /api/auth/login - Login user
- GET /api/auth/verify/:token - Verify email
