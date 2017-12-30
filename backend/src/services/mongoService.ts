import * as mongoose from "mongoose";
import {logger} from "../logging/logger";
import {Player} from "Player";

export const mongoService = (() => {

    const createPlayer = (name: string): Promise<Player> => {
        return new Promise(((resolve: Function, reject: Function) => {

        }));
    };

    const mongoMethods = {createPlayer};
    const init = () => {
        return new Promise((resolve: Function, reject: Function) => {
            mongoose.connect(process.env.MONGO || "mongodb://localhost:27017/uptain-board",
                {useMongoClient: true}).then(() => {
                resolve(mongoMethods);
            }).catch((err: Error) => {
                logger.error("Could not establish a connection to MongoDB", {error: err});
                reject();
            });
        });
    };

    return {init};
})();