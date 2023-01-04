import express from 'express';
import logging from 'morgan';
import routes from './routesController';

const port = 8086;
const host = 'localhost';
const app = express();

app.use(logging('dev'));
app.use('/', routes);

app.listen(port, host, (): void => {
    // /api?filename=fjord.jpg&width=400&height=400
    
    console.log(`Server is running at http://${host}:${port}`);
});

export default app;
