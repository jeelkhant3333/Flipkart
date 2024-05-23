# Flipkart Clone E-commerce Platform

## Overview

This project is a comprehensive e-commerce platform inspired by Flipkart. It is built using Angular for the frontend and Spring Boot with Hibernate for the backend. The platform includes functionalities such as user authentication, product management, cart operations, and order processing.

## Features

- User Authentication**: Secure login and registration system.
- Product Management**: Add, edit, and delete products.
- Cart Operations**: Add to cart, view cart, and manage cart items.
- Order Processing**: Place orders, view order history, and track orders.
- Responsive Design**: Optimized for different screen sizes and devices.

## Technologies Used

### Frontend

- Angular
- TypeScript
- HTML
- Tailwind CSS
- NGRX Store (for state management)

### Backend

- Spring Boot
- Hibernate
- MySQL

## Project Structure

### Frontend Repository

[Frontend Repository](https://github.com/jeelkhant3333/Flipkart_clone_Angular_Springboot.git)

```
flipkart-clone-frontend/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── services/
│   │   ├── store/
│   │   ├── app.component.ts
│   │   ├── app.module.ts
│   ├── assets/
│   ├── environments/
│   ├── index.html
│   ├── main.ts
├── angular.json
├── package.json
```

### Backend Repository

[Backend Repository](https://github.com/jeelkhant3333/flipkart_backend_java.git)

```
flipkart-clone-backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com/
│   │   │   │   ├── example/
│   │   │   │   │   ├── controllers/
│   │   │   │   │   ├── models/
│   │   │   │   │   ├── repositories/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── FlipkartCloneApplication.java
│   │   ├── resources/
│   │       ├── application.properties
├── pom.xml
```

### Prerequisites

- Node.js
- Angular CLI
- Java JDK
- Maven
- MySQL

### Frontend Setup

1. Clone the frontend repository:
   ```bash
   git clone https://github.com/jeelkhant3333/Flipkart_clone_Angular_Springboot.git
   cd flipkart-clone-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the Angular application:
   ```bash
   ng serve
   ```

### Backend Setup

1. Clone the backend repository:
   ```bash
   git clone https://github.com/jeelkhant3333/flipkart_backend_java.git
   cd flipkart-clone-backend
   ```

2. Configure the MySQL database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. Build and run the Spring Boot application:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

## Usage

- Open the frontend application in your browser at `http://localhost:4200`.
- The backend server will be running at `http://localhost:3333`.
