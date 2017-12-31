import {Request, Response} from "express";
import {logger} from "../logging/logger";
import {Player} from "Player";

export const playerController = (mongoDB: any) => {
    const updateScore = (req: Request, res: Response) => {
        mongoDB.updatePlayerScore(req.body.name, req.body.score).then(() => {
            logger.debug("Player score was successfully updated", {name: req.body.name, score: req.body.score});
            res.status(200).send({message: "Success"});
        }).catch((err: Error) => {
            logger.error("Saving the players score failed!", {name: req.body.name, error: err});
            res.status(500).send({message: "There was an internal server error"});
        });
    };

    const getScores = (req: Request, res: Response) => {
        logger.debug("Getting scores");
        const cursor = mongoDB.getScores();
            const player: Player[] = [];
            cursor.on("data", (doc: Player) => {
                player.push(doc);
            });
            cursor.on("error", (err: Error) => {
                logger.error("Cursor for getting Scores ran into an error", {error: err});
                res.status(500).send({message: "There was an internal server error"});
                return;
            });
            cursor.on("end", () => {
                logger.debug("Getting the scores was successful", player);
                res.status(200).send({message: "Success", data: player});
            });
    };

    return {
        updateScore,
        getScores
    };
};