import { Application } from "https://deno.land/x/oak/mod.ts";
// import { oakCors } from 'https://deno.land/x/cors/mod.ts';

import todosRoutes from './routes/todos.ts';

const app = new Application();

app.use(async (ctx, next) => {
  console.log('Middleware!');
  await next();
});

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());
// app.use(oakCors());
await app.listen({ port: 8000 });