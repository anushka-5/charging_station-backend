import JWT from 'jsonwebtoken';
import User from '../models/user_model.js'; // Import the User model


const createUser = async (req, res) => {
    try {
        // Simulate user creation logic
        const {username, email, password} = req.body; // Assume user data is sent in the request body
     
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Here you would typically save the user to a database
        const result = await User.create({ username, email, password });


        res.status(201).json({ message: 'User created successfully', result});
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

// login

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password (assuming you have a method to compare passwords)
        const isMatch = await user.comparePassword(password); // You need to implement this method in your User model

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}

const userController = {
    createUser,
    loginUser
}

export default userController;