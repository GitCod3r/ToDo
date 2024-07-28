// Import necessary modules and types
import { Request, Response } from 'express'; // Types for Express request and response objects
import { User } from '../models/userModel'; // User model for interacting with the database
import bcrypt from 'bcryptjs'; // Library for hashing and comparing passwords
import jwt from 'jsonwebtoken'; // Library for creating JSON Web Tokens
import { AuthRequest } from '../middleware/auth'; // Custom request type that includes user authentication info

// Default JWT secret or fallback to 'secret' if not defined in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Async function to handle user registration
export const registerUser = async (req: Request, res: Response) => {
  console.log('Register route hit'); // Debug log for route access
  try {
    // Destructure username, email, and password from request body
    const { username, email, password } = req.body;

    // Hash the password with a salt round of 10
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance with the provided details
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user and a 201 Created status code
    res.status(201).json(savedUser);
  } catch (error) {
    // Log and respond with error if operation fails
    console.error('Error in registerUser:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// Async function to handle user login
export const loginUser = async (req: Request, res: Response) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found, respond with an error
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    // If password doesn't match, respond with an error
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT for the user
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    // Exclude password from the user object to be returned
    const { password: _, ...userWithoutPassword } = user.toObject();

    // Respond with the token and user data (excluding password)
    res.json({ token, user: userWithoutPassword });
  } catch (error) {
    // Log and respond with error if operation fails
    res.status(500).json({ error: 'Server error' });
  }
};

// Async function to get the current authenticated user's data
export const getUser = async (req: AuthRequest, res: Response) => {
  try {
    // Find the user by ID (excluding the password from the result)
    const user = await User.findById(req.user.id).select('-password');
    // If user not found, respond with an error
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    // Respond with the user data
    res.json(user);
  } catch (error) {
    // Log and respond with error if operation fails
    res.status(500).json({ error: 'Server error' });
  }
};