import * as mongoose from "mongoose";
import {logger} from "../logging/logger";

export const mongoService = (() => {

    const mongoMethods = {};
    const init = () => {
        return new Promise((resolve: Function, reject: Function) => {
            mongoose.connect(process.env.MONGO || "mongo://localhost:27017/uptain-board",
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