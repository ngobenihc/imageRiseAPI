import { Request, Response } from 'express';

// this will show if the page is not loaded
export const norPageFound404 = (req: Request, res: Response) => {
  res.status(404);
  res.render('pageNotFound');
};