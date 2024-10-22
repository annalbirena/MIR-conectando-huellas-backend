import type { Application } from 'express';
import petsRoutes from './petsRoutes';

export default function setupRoutes(app: Application) {
  app.get('/', (_, res) => {
    res.redirect('/api/docs');
  });

  const API_PREFIX = '/api';

  app.use(API_PREFIX, petsRoutes);
}
