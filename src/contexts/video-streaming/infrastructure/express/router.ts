/* eslint-disable import/order */
import express from 'express';
import videoStreamingController from './controllers/videoStreamingController';

const videoStreamingRouter = express.Router();

videoStreamingRouter.get('/video-streaming/:deviceId', videoStreamingController);

export default videoStreamingRouter;
