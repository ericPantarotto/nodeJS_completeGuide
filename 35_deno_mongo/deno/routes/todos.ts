import { Router } from 'https://deno.land/x/oak/mod.ts';
import * as uuid from 'jsr:@std/uuid';

const router = new Router();

interface Todo {
  id: string;
  text: string;
}
let toDos: Array<Todo> = [];

router.get('/todos', (ctx, next) => {
  ctx.response.body = { todos: toDos };
});

router.post('/todos', async (ctx, next) => {
  const data = await ctx.request.body.json();
  const newTodo: Todo = { id: uuid.v1.generate(), text: data.text };
  toDos.push(newTodo);
  ctx.response.body = { message: 'Todo created!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx, next) => {
  const tId: string = ctx.params.todoId;
  const data = await ctx.request.body.json();
  const todoIndex = toDos.findIndex(todo => todo.id === tId);
  toDos[todoIndex] = { id: tId, text: data.text };
  ctx.response.body = { message: 'Todo updated!' };
});

router.delete('/todos/:todoId', ctx => {
  const tId: string = ctx.params.todoId;
  toDos = toDos.filter(todo => todo.id !== tId);
  ctx.response.body = { message: 'Todo deleted!' };
});

export default router;
