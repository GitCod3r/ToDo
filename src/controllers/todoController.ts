import { Request, Response } from 'express';
import { Todo } from '../models/todoModel';
import { AuthRequest } from '../middleware/auth';

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo = new Todo({
      title,
      user: req.user.id,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: id, user: req.user.id },
      { title, completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findOneAndDelete({ _id: id, user: req.user.id });
    
    if (!deletedTodo) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: `Task deleted successfully`, taskId: id });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};