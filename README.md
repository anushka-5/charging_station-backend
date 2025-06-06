Charging Station Management Backend
Overview
Built with Node.js and Express, this backend handles user authentication and charging station management with full CRUD operations.

Tech Stack
Node.js

Express

MongoDB (via Compass)

Nodemon (Auto-restart)

Bcrypt (Password hashing)

JWT (User authentication)

Thunder Client (API testing)

Folder Structure
/backend  
│── controller/  
│   ├── charging_point_controller.js  
│   ├── user_controller.js  
│── middleware/  
│   ├── auth.js  
│── models/  
│   ├── charging_point_model.js  
│   ├── user_model.js  
│── routes/  
│   ├── charging_point_routes.js  
│   ├── user_routes.js  
│── .env  
│── .gitignore  
│── package.json  
│── server.js  
│── README.md  
Features
✔ User Authentication (Register/Login using JWT) ✔ Password Encryption (Using Bcrypt & Salt) ✔ Charging Station Management (CRUD operations) ✔ Database Integration (MongoDB via Mongoose) ✔ Protected Routes (JWT-secured APIs)

API Endpoints
User Routes
POST   /api/user/signup    → Register  
POST   /api/user/login     → Login (JWT Token)  
Charging Point Routes (Protected)
POST   /api/charging-points     → Add new charging point  
GET    /api/charging-points     → Fetch all charging points  
PUT    /api/charging-points/:id → Update charging point  
DELETE /api/charging-points/:id → Delete charging point  
Setup Instructions
1️⃣ Clone the repo

sh
git clone <repo-url>  
cd backend  
2️⃣ Install dependencies

sh
npm install  
3️⃣ Set up environment variables (.env)

MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
4️⃣ Run the server

sh
npm run dev  
API Testing
Use Thunder Client or Postman for manual API testing.

Deployment
Backend deployed on Render/Vercel/AWS, accessible via public API.