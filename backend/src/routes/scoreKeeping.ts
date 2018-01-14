import * as express from "express";
import * as PlayerController from "../controller/playerController";

export const getRouter = (mongoDB: any) => {
    const router = express.Router();
    const playerController = PlayerController.playerController(mongoDB);

    router.get("/scores", playerController.getScores);
    router.put("/scores/:player", playerController.updateScore);
    router.post("/player");

    return router;
};