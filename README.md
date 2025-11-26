---

# **Task Management Microservice Backend**

A lightweight microservices-based backend system for managing tasks, users, and real-time notifications. Built using **Node.js**, **Express**, **MongoDB**, **RabbitMQ**, and fully containerized using **Docker & Docker Compose**.

---

## 🚀 **Architecture Overview**

This project follows a microservice architecture with three independent services:

1. **User Service** (Port 3000)

   * Handles user creation and retrieval
   * Stores users in MongoDB (`users` database)

2. **Task Service** (Port 3001)

   * Creates and fetches tasks
   * Publishes `task_created` events to RabbitMQ
   * Stores tasks in MongoDB (`tasks` database)

3. **Notification Service** (Port 3002)

   * Listens to `task_created` queue
   * Logs real-time notifications whenever a new task is created

All services communicate asynchronously via **RabbitMQ**.

---

## 🛠 **Tech Stack**

* **Node.js**, **Express.js**
* **MongoDB** (Dockerized)
* **RabbitMQ** (Dockerized with Management UI)
* **amqplib**
* **Docker & Docker Compose**

---

## 📦 **Microservices**

### ✅ **User Service**

* Create new users
* Get list of users
* MongoDB collection: `users`

### ✅ **Task Service**

* Create new tasks
* Get list of tasks
* Publishes messages to `task_created` queue

### ✅ **Notification Service**

* Subscribes to `task_created` queue
* Logs notifications to console (can be expanded to email/SMS etc.)

---

## 🐳 **Running the Project (Docker Compose)**

### **1. Clone the repository**

```bash
git clone https://github.com/your-username/task-management-microservice-backend.git
cd task-management-microservice-backend
```

### **2. Build & Start all services**

```bash
docker-compose up --build -d
```

### **3. Access Services**

| Service              | URL                                                                          |
| -------------------- | ---------------------------------------------------------------------------- |
| User Service         | [http://localhost:3000](http://localhost:3000)                               |
| Task Service         | [http://localhost:3001](http://localhost:3001)                               |
| Notification Service | Runs in background                                                           |
| RabbitMQ UI          | [http://localhost:15672](http://localhost:15672) (user: guest / pass: guest) |
| MongoDB              | localhost:27017                                                              |

---

## 🧪 **API Endpoints**

### **User Service**

```
POST /users  
GET /users
```

### **Task Service**

```
POST /task  
GET /tasks
```

When a task is created, a message is published to RabbitMQ → consumed by Notification Service.

---

## 📁 **Project Structure**

```
.
├── docker-compose.yml
├── user-services/
│   └── index.js
├── task-services/
│   └── index.js
└── notification-service/
    └── index.js
```

---

## 🔮 **Future Enhancements**

* Add API Gateway
* Add Authentication using JWT
* Implement Email/SMS notifications
* Add Redis caching
* Add front-end UI
* Deploy on AWS ECS/EKS or EC2

---

## 👨‍💻 **Author**

**Nikhilesh Mauje**
Backend & DevOps | Microservices | Docker | MERN Stack
