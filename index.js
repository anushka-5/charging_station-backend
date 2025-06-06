import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import userRoutes  from './routes/user_routes.js';
import chargingPointRoutes from './routes/charging_point_routes.js';
const app = express();
app.use(cors())
// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Use user routes
app.use('/api/users', userRoutes);
// Use charging point routes
app.use('/api/charging-points', chargingPointRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

function dbConnection(){
    const url = process.env.MONGODB_URL
    mongoose.connect( url )
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));
}

dbConnection();

// Start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})