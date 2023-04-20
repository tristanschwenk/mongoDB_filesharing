import express from "express"
import { ErrorMiddleware } from "../middlewares/error.js"
import { fileController } from "./file.controller.js"
import multer from "multer"

export const fileRouter = express.Router()

fileRouter.get('/', fileController.findAll)

fileRouter.get('/:name', fileController.getFile);

fileRouter.post(
    '/',
    multer().single('content'),
    fileController.addFile,
  );

fileRouter.delete('/:name', fileController.deleteFile);

fileRouter.use(ErrorMiddleware)

