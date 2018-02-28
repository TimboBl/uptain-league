import {Request, Response} from "express";
import {logger} from "../logging/logger";
import {Player} from "Player";
import axios from 'axios';

export const playerController = (mongoDB: any) => {
    const K = 32;

    const updateScore = (req: Request, res: Response) => {
        let oldPlayer: Player;
        let opponentPlayer: Player;
        let newPlayers: { player: Player, opponent: Player };
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
            logger.debug("Player score was successfully updated", {name: req.body.name});
            return res.status(200).send({message: "Success"});
        }).catch((err: Error) => {
            logger.error("Saving the players score failed!", {error: err, name: req.body.name});
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
            logger.debug("Getting the scores was successful");
            res.status(200).send({message: "Success", data: player});
        });
    };

    const saveNewPlayer = (req: Request, res: Response) => {
        if (req.body.name) {
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

    const updatePlayerScore = (pl: Player, opp: Player, result: number): { player: Player, opponent: Player } => {
        const returnValue = {
            player: pl,
            opponent: opp
        };

        const r1 = Math.pow(10, (pl.score / 400));
        const r2 = Math.pow(10, (opp.score / 400));
        const e1 = r1 / (r1 + r2);
        const e2 = r2 / (r1 + r2);
        const s1 = result === 0 ? 0 : 1;
        const s2 = result === 1 ? 1 : 0;
        pl.score = pl.score + K * (s1 - e1);
        opp.score = opp.score + K * (s2 - e2);

        if (result === 0/*The player has lost to its opponent*/) {
            pl.losses += 1;
            opp.wins += 1;
        } else {
            pl.wins += 1;
            opp.losses += 1;
        }
        pl.totalGames += 1;
        opp.totalGames += 1;

        return returnValue;
    };

    const updateKPI = (req: Request, res: Response) => {
        axios.post("https://dashboard.uptain.de/widgets/leader", JSON.stringify({
            text: req.body.leader,
            auth_token: process.env.AUTH_TOKEN
        })).then(() => {
            logger.debug("Successfully updated KPI monitor");
            res.status(200).send({message: "Success"});
        }).catch((err: Error) => {
            logger.debug("Failed to update KPI monitor", {error: err});
            res.status(500).send({message: "There was an internal server error"});
        });
    };

    return {
        updateScore,
        getScores,
        saveNewPlayer,
        updateKPI
    };
};