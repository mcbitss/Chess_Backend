import express from 'express';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import { errorHandler as queryErrorHandler } from 'querymen';
import { errorHandler as bodyErrorHandler } from 'bodymen';
import { env } from '../../config';

export default (apiRoot, routes) => {
  const app = express();
  console.log(path.resolve('src/api/task/temp'));

  /* istanbul ignore next */
  if (env === 'production' || env === 'development') {
    app.use(cors());
    app.use(compression());
    app.use(morgan('dev'));
  }

  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
  //app.use(timeout(10*60*1000));
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(apiRoot, routes);
  app.use(queryErrorHandler());
  app.use(bodyErrorHandler());
  app.use(
    '/assets',
    express.static(path.resolve(__dirname, '../../api/task/temp'))
  );

  return app;
};
