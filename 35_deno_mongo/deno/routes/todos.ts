// import { ObjectId } from 'https://deno.land/x/mongo@v0.33.0/mod.ts';
import { Router } from 'https://deno.land/x/oak/mod.ts';
import * as uuid from 'jsr:@std/uuid';
import { getDb } from '../helpers/db_clients.ts';

const router = new Router();

interface Todo {
  id?: string;
  text: string;
}
let toDos: Array<Todo> = [];

router.get('/todos', async (ctx, next) => {
  const toDos = await (await getDb()).collection('todos').find().toArray();
  ctx.response.body = { todos: toDos };
});

router.post('/todos', async (ctx, next) => {
  const data = await ctx.request.body.json();
  const newTodoArray: Todo = { id: uuid.v1.generate(), text: data.text };
  const newTodo: Todo = { text: data.text };
  
  (await getDb()).collection('todos').insertOne(newTodo)
  toDos.push(newTodoArray);

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
