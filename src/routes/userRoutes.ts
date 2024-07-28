import { Router } from 'express'; // Import Router from express to manage route handling
import { registerUser, loginUser, getUser } from '../controllers/userController'; // Import user-related controller functions
import { auth } from '../middleware/auth'; // Import authentication middleware

const router = Router(); // Create a new Router instance

// Route for user registration, uses the registerUser controller function
router.post('/register', registerUser);
// Route for user login, uses the loginUser controller function
router.post('/login', loginUser);
// Route for fetching the current user's data, uses the getUser controller function. It's protected by the auth middleware
router.get('/me', auth, getUser);

export default router; // Export the router for use in other parts of the application