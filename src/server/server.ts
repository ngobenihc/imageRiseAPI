
import express from 'express';
import routes from '../routes/routes';

import logger from '../middleware/logger';
import path from 'path';
const app = express();

const port = 3000;

app.get(
  '/',
  logger,
  async (req, res): Promise<void> => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  }
);

app.use('/image', logger, routes);


app.listen(port, () => {
  console.log('Server started at http://localhost:3000/image?f=');
});

export default app;
