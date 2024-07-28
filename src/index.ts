// Import necessary modules and libraries
import mongoose from 'mongoose'; // MongoDB object modeling tool
import dotenv from 'dotenv'; // Loads environment variables from a .env file into process.env
import todoRoutes from './routes/todoRoutes'; // Import todo routes
import userRoutes from './routes/userRoutes'; // Import user routes
import express from 'express'; // Import Express framework

// Initialize dotenv to use environment variables
dotenv.config();

// Create an Express application
const app = express();
// Define the port to run the server on, defaulting to 3000 if not specified in the environment variables
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies in requests
app.use(express.json());

// Root route handler that logs access and sends a response
app.get('/', (req, res) => {
  console.log('Root route accessed'); // Log when root route is accessed
  res.send('Server is running!'); // Send response to indicate the server is running
});

// Middleware for logging and then passing control to todoRoutes for any '/api/todos' route
app.use('/api/todos', (req, res, next) => {
  console.log('Todos route accessed'); // Log when todos route is accessed
  next(); // Pass control to the next middleware (todoRoutes in this case)
}, todoRoutes);

// Middleware for logging and then passing control to userRoutes for any '/api/users' route
app.use('/api/users', (req, res, next) => {
  console.log('Users route accessed'); // Log when users route is accessed
  next(); // Pass control to the next middleware (userRoutes in this case)
}, userRoutes);

// Connect to MongoDB using the connection URI from the environment variables
mongoose.connect(process.env.MONGODB_URI || '', {
})
.then(() => {
  console.log('Connected to MongoDB'); // Log successful connection
  // Start the server and listen on the defined port
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log the server running status
  });
})
.catch((error) => {
  // Log any errors that occur during connection
  console.error('MongoDB connection error:', error);
});