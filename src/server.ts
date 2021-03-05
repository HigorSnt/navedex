import express from 'express';
import dotenv from 'dotenv';
import routes from './routes';
import { errors } from 'celebrate';

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());
app.listen(3333);
