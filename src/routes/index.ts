import type { Application } from 'express';
import petsRoutes from './petsRoutes';
import userRoutes from './userRoutes';
import speciesRoutes from './speciesRoutes';

export default function setupRoutes(app: Application) {
  app.get('/', (_, res) => {
    res.redirect('/api/docs');
  });

  const API_PREFIX = '/api';

  app.use(API_PREFIX, userRoutes);
  app.use(API_PREFIX, petsRoutes);
  app.use(API_PREFIX, speciesRoutes);
}
