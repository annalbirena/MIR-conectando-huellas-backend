import cors from 'cors';
import express, { type Application } from 'express';
import morgan from 'morgan';

function configExpress(app: Application): void {
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  // morgan
  // urlencoded
}

export default configExpress;
