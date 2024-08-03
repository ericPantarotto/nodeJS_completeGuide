import { oakCors } from 'https://deno.land/x/cors/mod.ts';
import { Application } from 'https://deno.land/x/oak/mod.ts';
import todosRoutes from './routes/todos.ts';

const app = new Application();

app.use(async (ctx, next) => {
  console.log('Middleware!');
  await next();
});

// NOTE: provided as per the course
// app.use(async (ctx, next) => {
//   console.log(ctx.request.ip);
//   console.log(ctx.request.url);

//   ctx.response.headers.set(
//     'Access-Control-Allow-Origin',
//     'http://192.168.1.30:3000'
//   );
//   ctx.response.headers.set(
//     'Access-Control-Allow-Methods',
//     'GET, POST, PUT, DELETE'
//   );
//   ctx.response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
//   await next();
// });

app.use(
  oakCors({
    origin: 'http://192.168.1.30:3000',
  })
);

app.use(todosRoutes.routes());
app.use(todosRoutes.allowedMethods());

await app.listen({ port: 8000 });
