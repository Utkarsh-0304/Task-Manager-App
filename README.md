# 📝 Full-Stack Task Manager Application 

A collaborative task management application designed to help teams and individuals organize projects efficiently. This application allows users to create boards, manage task lists, and organize tasks using a clean and intuitive interface.

## 🚀 Features

- Create, update, and delete task lists and cards
- Fast and lightweight backend using Fastify
- MongoDB Atlas integration with Mongoose schemas
- Basic authentication
- Responsive and clean UI using React

## 🛠 Tech Stack

- **Frontend:** React, JavaScript, HTML, CSS
- **Backend:** Node.js, Fastify
- **Database:** MongoDB Atlas, Mongoose
- **Others:** UUID (for generating unique IDs)

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/Utkarsh-0304/Task-Manager-App.git
cd Task-Manager-App
```
### Frontend Setup
```bash
cd frontend 
npm install
npm start
```

### Backend Setup
```bash
cd backend 
npm install
npm run dev
```

### Create a .env file
Create a .env file in the backend directory and add your MongoDB connection URI:
```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db-name
```
### Database Setup

* Create a MongoDB Atlas account, and create a cluster.
* Create a database and collection.
* Copy the connection string and insert it into the .env file.

## 🤝 Contributing
Feel free to fork this repo and raise a PR if you’d like to contribute or suggest improvements.



