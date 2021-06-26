/* eslint-disable import/order */
import express from 'express';
import synchronizeController from './controllers/synchronizeController';

const contactsRouter = express.Router();

contactsRouter.post('/devices/:id/synchronize', synchronizeController);

export default contactsRouter;
