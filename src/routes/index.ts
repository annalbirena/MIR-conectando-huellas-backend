import type { Application } from 'express';
import petsRoutes from './lostpetsRoutes';
import userRoutes from './userRoutes';
import speciesRoutes from './speciesRoutes';
import lotspetsRoutes from './lostpetsRoutes';
import adoptionpetsRoutes from './adoptionpetsRoutes';
import imageRoutes from './imageRoutes';

export default function setupRoutes(app: Application) {
  app.get('/', (_, res) => {
    res.redirect('/api/docs');
  });

  const API_PREFIX = '/api';

  app.use(API_PREFIX, userRoutes);
  app.use(API_PREFIX, petsRoutes);
  app.use(API_PREFIX, speciesRoutes);
  app.use(API_PREFIX, lotspetsRoutes);
  app.use(API_PREFIX, adoptionpetsRoutes);
  app.use(API_PREFIX, imageRoutes);
}
