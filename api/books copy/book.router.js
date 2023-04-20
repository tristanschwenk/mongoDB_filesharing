import express from "express"
import { ErrorMiddleware } from "../src/middlewares/error.js"
import { validIdMiddleware } from "../src/middlewares/validId.js"
import { validSchemaMiddleware } from "../src/middlewares/validSchema.js"
import { bookController } from "./book.controller.js"

export const bookRouter = express.Router()

bookRouter.get('/', bookController.findAll)

bookRouter.get('/paginate', bookController.find)

bookRouter.get('/:id', validIdMiddleware, bookController.findOne)

bookRouter.post('/', validSchemaMiddleware, bookController.create)

bookRouter.delete("/:id", validIdMiddleware, bookController.remove)

bookRouter.patch('/:id', validIdMiddleware,  bookController.update)

bookRouter.put('/:id', validIdMiddleware, bookController.replace)

bookRouter.use(ErrorMiddleware)