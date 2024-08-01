import bodyParser from 'body-parser';
import express from 'express';

import toDoRoutes from './routes/todo';

const app = express();

app.use(bodyParser.json());
app.use(toDoRoutes);

app.listen(3000);
