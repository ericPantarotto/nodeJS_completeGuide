import { Router } from 'express';

import { Todo } from '../models/todo';

type RequestBody = { text: string };
type RequestParams = { todoId: string };

let toDos: Array<Todo> = [];
const router = Router();

router.get('/', (req, res, next) => {
  res.status(200).json({ toDos: toDos });
});

router.post('/todo', (req, res, next) => {
  //   const body = req.body as { text: string };
  const body = req.body as RequestBody;
  const newToDo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  toDos.push(newToDo);
  res.status(201).json({ message: 'Added Todo', toDo: newToDo, toDos: toDos });
});

router.put('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  const tId = params.todoId;
  const body = req.body as RequestBody;

  const todoIndex = toDos.findIndex(item => item.id === tId);
  if (todoIndex >= 0) {
    toDos[todoIndex] = { id: tId, text: body.text };
    return res.status(200).json({ message: 'Updated todo', toDos: toDos });
  }
  res.status(404).json({ message: "Couldn't find todo for this id" });
});

router.delete('/todo/:todoId', (req, res, next) => {
  const params = req.params as RequestParams;
  toDos = toDos.filter(item => item.id !== params.todoId);
  console.log(toDos);

  res.status(200).json({ message: 'Deleted todo', toDos: toDos });
});

export default router;
