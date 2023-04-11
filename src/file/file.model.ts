import mongoose, { Schema } from "mongoose";

export const File = mongoose.model("File", new Schema({
    title: String,
    creation: {
        type: Date,
        default: new Date()
    },
    type: String
}))

