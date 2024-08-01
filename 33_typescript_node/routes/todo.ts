import { Router } from 'express';

import { Todo } from '../models/todo';

const toDos: Array<Todo> = [];
const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ todos: toDos });
});

router.post('/', (req, res, next) => {
  const newToDo: Todo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };

  toDos.push(newToDo);
});
export default router;
