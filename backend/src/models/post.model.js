import mongoose, { Schema } from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const postSchema = new Schema({
    CreatedBy : {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    IncidentType : {
        type: String,
        required: true
    },
    Location : {
        type: String,
        required: true
    },
    Description : {
        type: String,
        required: true
    },
    Area : {
        type: String,
        required: true
    },
    Image : {
        type: String,
        required: true
    },
    Video : {
        type: String,
        required: true
    },
    Audio : {
        type: String,
        required: true
    },
})

export const Post  = mongoose.model("Post", postSchema);
