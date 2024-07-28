"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todoModel_1 = require("../models/todoModel");
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const todos = yield todoModel_1.Todo.find({ user: req.user.id });
        res.json(todos);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.getTodos = getTodos;
const createTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const newTodo = new todoModel_1.Todo({
            title,
            user: req.user.id,
        });
        const savedTodo = yield newTodo.save();
        res.status(201).json(savedTodo);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.createTodo = createTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const updatedTodo = yield todoModel_1.Todo.findOneAndUpdate({ _id: id, user: req.user.id }, { title, completed }, { new: true });
        res.json(updatedTodo);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.updateTodo = updateTodo;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedTodo = yield todoModel_1.Todo.findOneAndDelete({ _id: id, user: req.user.id });
        if (!deletedTodo) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: `Task deleted successfully`, taskId: id });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});
exports.deleteTodo = deleteTodo;
