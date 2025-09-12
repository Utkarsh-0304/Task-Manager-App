# TaskFlow - AI-Powered Task Management App

An intuitive, Trello-like task management application designed to enhance productivity by leveraging generative AI. TaskFlow enables users to manage complex projects through a clean and visual Kanban-style interface, allowing them to generate entire project boards from a single prompt.
### Landing Page
<img width="1890" height="894" src="https://github.com/user-attachments/assets/d2f270a1-6d59-4198-a7a5-e99c2abd5349" />

### Home Page
<img width="1902" height="890" src="https://github.com/user-attachments/assets/cee4b980-c2ee-44dc-9c8e-5e4377a89630" />

### Board View 

<img width="1903" height="883" src="https://github.com/user-attachments/assets/fdca98bb-dc49-4fbc-94f3-20abe787fe55" />

## Key-Features

- AI-Powered Board Generation: Integrated with the Google Gemini API to act as a project assistant. Users can input a high-level goal (e.g., "Launch a new marketing campaign") and automatically receive a fully structured board with relevant lists and actionable tasks.
- Intuitive Kanban Interface: A clean, minimalist UI for managing projects with boards, lists, and cards.
- Drag-and-Drop Functionality: Seamlessly move tasks between lists to update their status in real-time.
- Full CRUD Operations: Complete functionality to Create, Read, Update, and Delete boards, lists, and cards.
- Secure User Authentication: A secure authentication system for user registration and login, ensuring all user data and project boards remain private.

## Tech Stack

- **Frontend:** ReactJS (with Vite), JavaScript, TailwindCSS
- **Backend:** Node.js, Fastify
- **Databases and ODMs:** MongoDB Atlas (with Mongoose)
- **AI Integration:** Gemini API
- **Others:** JWT (authentication), UUID (generating unique IDs), React-dnd (drag and drop functionality) 

## Getting-Started

You can follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites
You'll need to have the following installed on your machine:

-Node.js (which includes npm)

### Installation

#### Clone the repository
```bash
git clone https://github.com/Utkarsh-0304/Task-Manager-App.git
cd Task-Manager-App
```
#### Frontend Setup
```bash
cd client 
npm install
```

#### Backend Setup
```bash
cd server 
npm install
```

#### Create a .env file
Create a .env file in the backend directory and add your MongoDB connection URI:
```bash
PORT=3001
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/your-db-name
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_google_gemini_api_key
```
#### Database Setup
* Create a MongoDB Atlas account and create a cluster.
* Create a database and collection.
* Copy the connection string and insert it into the .env file.

#### Run the application 
- To start the backend server, run the following from the server directory:
```bash
npm run start
```

- To start the frontend development server, run the following from the client directory:
```bash
npm run dev 
```

Your application should now be running, with the frontend accessible at http://localhost:3000 and the backend at http://localhost:3001.




