/* eslint-disable no-path-concat */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
// import fs from 'fs';
import mjpegServer from 'mjpeg-server';
import streamingBus from '../../streamingBus/streamingBus';

// eslint-disable-next-line max-lines-per-function
async function videoStreamingController(
  request: Request, response: Response, next: NextFunction,
): Promise<void> {
  try {
    const { deviceId } = request.params;

    console.log('Got request');

    const mjpegReqHandler = mjpegServer.createReqHandler(request, response);

    streamingBus.on(`${deviceId}`, (imageBuffer: ArrayBuffer) => {
      console.log(`on: ${deviceId} ${new Date()}`);

      mjpegReqHandler.write(imageBuffer, () => {
        mjpegReqHandler.close();
      });
    });

    /* let i = 0;

    const timer = setInterval(updateJPG, 50);

    function checkIfFinished() {
      if (i > 100) {
        clearInterval(timer);

        mjpegReqHandler.close();

        console.log('End Request');
      }
    }

    function updateJPG() {
      const file = __dirname + '/data/' + i + '.jpg';

      // console.log(file);

      fs.readFile(file, sendJPGData);

      i++;
    }

    function sendJPGData(error: Error|null, data: Buffer) {
      mjpegReqHandler.write(data, () => {
        checkIfFinished();
      });
    } */
  } catch (error) {
    next(error);
  }
}

export default videoStreamingController;
