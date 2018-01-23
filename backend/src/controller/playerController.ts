import {Request, Response} from "express";
import {logger} from "../logging/logger";
import {Player} from "Player";

export const playerController = (mongoDB: any) => {
    const updateScore = (req: Request, res: Response) => {
        let oldPlayer: Player;
        let opponentPlayer: Player;
        let newPlayers: {player: Player, opponent: Player};
        mongoDB.findPlayer(req.body.name).then((player: Player) => {
            oldPlayer = player;
            return mongoDB.findPlayer(req.body.opponent);
        }).then((opponent: Player) => {
            opponentPlayer = opponent;
            newPlayers = updatePlayerScore(oldPlayer, opponent, req.body.result);
            return mongoDB.updatePlayer(newPlayers.player);
        }).then(() => {
            return mongoDB.updatePlayer(newPlayers.opponent);
        }).then(() => {
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

    const saveNewPlayer = (req: Request, res: Response) => {
        if(req.body.name) {
            mongoDB.findPlayer(req.body.name).then((result: any) => {
                if (result) {
                    res.status(409).send({message: "Conflict! This name is already taken"});
                } else {
                    logger.debug("Saving a new Player", {player: req.body});
                    mongoDB.saveNewPlayer(req.body.name).then(() => {
                        logger.debug("New Player was successfully saved");
                        res.status(200).send({message: "Success"});
                    }).catch((err: Error) => {
                        logger.error("The new user could not be saved", {error: err});
                        res.status(500).send({message: "There was an internal server error"});
                    });
                }
            });
        }
    };

    const updatePlayerScore = (pl: Player, opp: Player, result: number): {player: Player, opponent: Player} => {
        const returnValue = {
            player: pl,
            opponent: opp
        };

        if (result === 0/*The player has lost to its opponent*/) {
            pl.score = opp.score - 400 * (pl.wins - pl.losses);
            opp.score = pl.score + 400 * (opp.wins - opp.losses);
        } else {
            pl.score = opp.score - 400 * (pl.wins - pl.losses);
            opp.score = pl.score + 400 * (opp.wins - opp.losses);
        }

        return returnValue;
    };

    return {
        updateScore,
        getScores,
        saveNewPlayer
    };
};