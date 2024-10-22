import type { Application } from 'express';

import assetRouter from '@api/asset';
import noteRouter from '@api/note';
import userRouter from '@api/user';
import authLocalRouter from '@auth/local';

function routes(app: Application): void {
  app.use('/api/assets', assetRouter);
  app.use('/api/notes', noteRouter);
  app.use('/api/users', userRouter);

  app.use('/auth/local', authLocalRouter);
}

export default routes;
