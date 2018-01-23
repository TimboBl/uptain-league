import * as mongoose from "mongoose";
import {logger} from "../logging/logger";
import {Player} from "Player";
import {PLAYER} from "../models/Player";
import {QueryCursor} from "mongoose";

export const mongoService = (() => {

    const updatePlayer = (name: string, score: number, totalGames: number, winOrLoss: string, winOrLossValue: number): Promise<Player> => {
                const update = winOrLoss === "win" ?
                    {"name": name, "score": score, "totalGames": totalGames, "wins": winOrLossValue} :
                    {"name": name, "score": score, "totalGames": totalGames, "losses": winOrLossValue};
                return PLAYER.update({"name": name}, {
                    "$set": update
                }, {upsert: true}).exec();
        };

    const findPlayer = (playerName: string) => {
        return PLAYER.find({name: playerName}).exec().then((result) => {
            if (result[0]) {
                return result[0];
            } else {
                return undefined;
            }
        });
    };

    const getScores = () => {
        return PLAYER.find({}, {name: 1, score: 1, _id: 0}).sort({score: -1}).cursor();
    };

    const mongoMethods = {
        updatePlayer,
        findPlayer,
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