import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export const File = mongoose.model("File", new Schema({
    title: String,
    creation: {
        type: Date,
        default: new Date()
    },
    mimetype: String,
    size: String,
}))

