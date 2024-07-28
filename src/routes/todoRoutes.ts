import { Router } from 'express'; // Import Router function from express to create a new router object
import { getTodos, createTodo, updateTodo, deleteTodo } from '../controllers/todoController'; // Import controller functions for todo operations
import { auth } from '../middleware/auth'; // Import auth middleware to secure routes

const router = Router(); // Create a new Router instance

// Define a GET route for fetching todos. It uses the auth middleware for authentication and getTodos controller for logic.
router.get('/', auth, getTodos);
// Define a POST route for creating a new todo. It uses the auth middleware for authentication and createTodo controller for logic.
router.post('/', auth, createTodo);
// Define a PUT route for updating an existing todo by ID. It uses the auth middleware for authentication and updateTodo controller for logic.
router.put('/:id', auth, updateTodo);
// Define a DELETE route for deleting an existing todo by ID. It uses the auth middleware for authentication and deleteTodo controller for logic.
router.delete('/:id', auth, deleteTodo);

export default router; // Export the router for use in the application