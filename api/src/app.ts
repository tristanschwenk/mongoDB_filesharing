import compression from "compression";
import express from "express"
import helmet from "helmet";
import mongoose from 'mongoose';
import cors from "cors";

import { userRouter } from "./users/user.router.js";
import { fileRouter } from "./file/file.router.js";

import { loggerMiddleware } from "./middlewares/logger.js";
import { noRouteMiddleware } from "./middlewares/noRoute.js";

export const app = express()

mongoose.connect("mongodb://localhost:27017/fileSharing", () => {
    console.log("succesfully connected to mongoDB")
})
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(loggerMiddleware)
app.use(cors())

app.use("/files", fileRouter)
//app.use("/users", userRouter)

app.use(noRouteMiddleware)
