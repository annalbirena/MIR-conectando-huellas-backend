import compression from 'compression';
import cors from 'cors';
import express, { type Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export default function setupExpress(app: Application) {
  const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type'],
  };

  app.use(cors(corsOptions));
  app.use(express.json());

  app.use(helmet());
  app.use(compression());
  app.use(morgan('dev'));
}
