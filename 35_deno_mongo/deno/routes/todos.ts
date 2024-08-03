import { ObjectId } from 'https://deno.land/x/mongo@v0.33.0/mod.ts';
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
  const transformedToDos = toDos.map(todo => ({
    id: todo._id.toString(),
    text: todo.text,
  }));

  ctx.response.body = { todos: transformedToDos };
});

router.post('/todos', async (ctx, next) => {
  const data = await ctx.request.body.json();
  const newTodoArray: Todo = { id: uuid.v1.generate(), text: data.text };
  const newTodo: Todo = { text: data.text };

  await (await getDb()).collection('todos').insertOne(newTodo);
  toDos.push(newTodoArray);

  ctx.response.body = { message: 'Todo created!', todo: newTodo };
});

router.put('/todos/:todoId', async (ctx, next) => {
  // console.log(ctx.request.url);
  const tId: string = ctx.params.todoId;
  const data = await ctx.request.body.json();

  await (await getDb()).collection('todos').updateOne(
    { _id: new ObjectId(tId) },
    {
      $set: { text: data.text },
    }
  );

  const todoIndex = toDos.findIndex(todo => todo.id === tId);
  toDos[todoIndex] = { id: tId, text: data.text };
  ctx.response.body = { message: 'Todo updated!' };
});

router.delete('/todos/:todoId', async ctx => {
  const tId: string = ctx.params.todoId;
  toDos = toDos.filter(todo => todo.id !== tId);

  await (await getDb())
    .collection('todos')
    .deleteOne({ _id: new ObjectId(tId) });
  ctx.response.body = { message: 'Todo deleted!' };
});

export default router;
