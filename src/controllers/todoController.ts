// Import Request and Response objects from express for type annotations
import { Request, Response } from 'express';
// Import the Todo model to interact with the Todo collection in the database
import { Todo } from '../models/todoModel';
// Import AuthRequest type for requests with user authentication information
import { AuthRequest } from '../middleware/auth';

// Define an asynchronous function to get all todos for the authenticated user
export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    // Find all todos belonging to the authenticated user
    const todos = await Todo.find({ user: req.user.id });
    // Respond with the found todos in JSON format
    res.json(todos);
  } catch (error) {
    // If an error occurs, respond with a 500 status code and an error message
    res.status(500).json({ error: 'Server error' });
  }
};

// Define an asynchronous function to create a new todo for the authenticated user
export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    // Extract the title from the request body
    const { title } = req.body;
    // Create a new Todo instance with the title and the user's ID
    const newTodo = new Todo({
      title,
      user: req.user.id,
    });
    // Save the new Todo to the database
    const savedTodo = await newTodo.save();
    // Respond with the saved Todo in JSON format and a 201 status code
    res.status(201).json(savedTodo);
  } catch (error) {
    // If an error occurs, respond with a 500 status code and an error message
    res.status(500).json({ error: 'Server error' });
  }
};

// Define an asynchronous function to update an existing todo for the authenticated user
export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    // Extract the todo ID from the request parameters and the updated fields from the request body
    const { id } = req.params;
    const { title, completed } = req.body;
    // Find the Todo by ID and user ID, and update it with the new values
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, completed },
      { new: true } // Return the updated document
    );
    // Respond with the updated Todo in JSON format
    res.json(updatedTodo);
  } catch (error) {
    // If an error occurs, respond with a 500 status code and an error message
    res.status(500).json({ error: 'Server error' });
  }
};

// Define an asynchronous function to delete an existing todo for the authenticated user
export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    // Extract the todo ID from the request parameters
    const { id } = req.params;
    // Find the Todo by ID and user ID, and delete it
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
    
    // If the Todo is not found, the deletion logic and response will be handled in the continuation of this function
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: `Task deleted successfully`, taskId: id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
   