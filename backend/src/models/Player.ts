import {model, Schema} from "mongoose";

const playerSchema = new Schema({
    name: {type: String},
    score: {type: Number}
});