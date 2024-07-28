"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import necessary modules and libraries
const mongoose_1 = __importDefault(require("mongoose")); // MongoDB object modeling tool
const dotenv_1 = __importDefault(require("dotenv")); // Loads environment variables from a .env file into process.env
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes")); // Import todo routes
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import user routes
const express_1 = __importDefault(require("express")); // Import Express framework
// Initialize dotenv to use environment variables
dotenv_1.default.config();
// Create an Express application
const app = (0, express_1.default)();
// Define the port to run the server on, defaulting to 3000 if not specified in the environment variables
const port = process.env.PORT || 3000;
// Middleware to parse JSON bodies in requests
app.use(express_1.default.json());
// Root route handler that logs access and sends a response
app.get('/', (req, res) => {
    console.log('Root route accessed'); // Log when root route is accessed
    res.send('Server is running!'); // Send response to indicate the server is running
});
// Middleware for logging and then passing control to todoRoutes for any '/api/todos' route
app.use('/api/todos', (req, res, next) => {
    console.log('Todos route accessed'); // Log when todos route is accessed
    next(); // Pass control to the next middleware (todoRoutes in this case)
}, todoRoutes_1.default);
// Middleware for logging and then passing control to userRoutes for any '/api/users' route
app.use('/api/users', (req, res, next) => {
    console.log('Users route accessed'); // Log when users route is accessed
    next(); // Pass control to the next middleware (userRoutes in this case)
}, userRoutes_1.default);
// Connect to MongoDB using the connection URI from the environment variables
mongoose_1.default.connect(process.env.MONGODB_URI || '', {})
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
