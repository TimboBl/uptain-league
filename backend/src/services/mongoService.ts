import * as mongoose from "mongoose";
import {logger} from "../logging/logger";
import {Player} from "Player";
import {PLAYER} from "../models/Player";

export const mongoService = (() => {

    const updatePlayerScore = (name: string, score: number): Promise<Player> => {

           return PLAYER.update({"name": name}, {
                "$set": {"name": name, "score": score}
            }, {upsert: true}).exec();
    };

    const getScores = () => {
        return PLAYER.find({}).cursor();
    };

    const mongoMethods = {
        updatePlayerScore,
        getScores
    };
    const init = () => {
        return new Promise((resolve: Function, reject: Function) => {
            mongoose.connect(process.env.MONGO || "mongodb://localhost:27017/uptain-board")
                .then(() => {
                resolve(mongoMethods);
            }).catch((err: Error) => {
                logger.error("Could not establish a connection to MongoDB", err);
                reject();
            });
        });
    };

    return {init};
})();