import { Application, Router } from 'express';
import { IndexController } from 'routesControllers/Controller_1';
import { RouterResize } from 'routesControllers/ResizeController';

const _routes: [string, Router][] = [
  ['/', IndexController],
  ['/', RouterResize ],
];
export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};