import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let todos = [];

router.get('/todos', (req, res, next) =>
  res.status(200).json({ todos: todos })
);

router.post('/todos', (req, res, next) => {
  const newTodo = { id: uuidv4(), text: req.body.text };
  todos.push(newTodo);
  res.status(201).json({ message: 'Todo created!', todo: newTodo });
});

router.put('/todos/:todoId', (req, res, next) => {
  const tId = req.params.todoId;
  const todoIndex = todos.findIndex(todo => todo.id === tId);
  todos[todoIndex] = { id: tId, text: req.body.text };
  res.status(200).json({ message: 'Todo updated!' });
});

router.delete('/todos/:todoId', (req, res, next) => {
  const tId = req.params.todoId;
    todos = todos.filter(todo => todo.id !== tId);
    res.status(200).json({ message: 'Todo deleted!' });
});


export const expRouter = router;
