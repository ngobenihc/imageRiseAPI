import express, { Application } from 'express';
import path from 'path';
import { routes } from './routes';
import { morganMiddleware } from './middleware/logger';
import { norPageFound404 } from 'middleware/noImage.middleware';


export const app: Application = express();

app.use('/images', express.static(path.join(__dirname, 'images')));

app.set('HTML', path.resolve(__dirname, 'HTML'));
app.set('HTML engine', 'ejs');

app.use(morganMiddleware);

routes(app);

app.use(norPageFound404);