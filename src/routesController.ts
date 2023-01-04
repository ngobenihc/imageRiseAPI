import { Router } from 'express';
import apiRouter from './api/apiContriller';

const routes = Router();

routes.use('/api', apiRouter);

export default routes;
