import express from "express";
import bodyParser from 'body-parser';
import { expRouter as todoRoutes } from './routes/todos.js';

const app = express();

app.use(bodyParser.json())
app.use(todoRoutes);

app.listen(8080)