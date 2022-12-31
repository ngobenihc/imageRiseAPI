import morgan from 'morgan';

/***
         * Shorter than default, also including response time.
         * :remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms
         
         */

export const morganMiddleware = morgan('short');


