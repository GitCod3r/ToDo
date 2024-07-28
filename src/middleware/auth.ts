// Import necessary modules from express and jsonwebtoken
import { Request, Response, NextFunction } from 'express'; // Types for handling Express requests, responses, and middleware next function
import jwt from 'jsonwebtoken'; // Module for encoding, decoding, and verifying JWT tokens

// Retrieve JWT secret from environment variables or use 'secret' as a fallback
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Extend the Express Request type to include a user property
export interface AuthRequest extends Request {
  user?: any; // Optional user property to store decoded JWT payload
}

// Middleware function to authenticate requests using JWT
export const auth = (req: AuthRequest, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header and remove the 'Bearer ' prefix
  const token = req.header('Authorization')?.replace('Bearer ', '');
  // If no token is provided, return a 401 Unauthorized response
  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    // Verify the token using the JWT secret, and decode the payload
    const decoded = jwt.verify(token, JWT_SECRET);
    // Attach the decoded payload to the request object's user property
    req.user = decoded;
    // Proceed to the next middleware function in the stack
    next();
  } catch (err) {
    // If token verification fails, return a 401 Unauthorized response
    res.status(401).json({ error: 'Token is not valid' });
  }
};