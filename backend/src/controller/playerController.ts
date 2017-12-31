import {Request, Response} from "express";
import {logger} from "../logging/logger";

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

    return {
        updateScore
    };
};