import * as mongoose from "mongoose";
import {logger} from "../logging/logger";
import {Player} from "Player";
import {PLAYER} from "../models/Player";

export const mongoService = (() => {

    const updatePlayer = (name: string, score: number): Promise<Player> => {

        return PLAYER.update({"name": name}, {
            "$set": {"name": name, "score": score}
        }, {upsert: true}).exec();
    };

    const getScores = () => {
        return PLAYER.find({}, {name: 1, score: 1, _id: 0}).cursor();
    };

    const mongoMethods = {
        updatePlayer,
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