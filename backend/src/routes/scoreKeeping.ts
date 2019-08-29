import * as express from "express";
import * as PlayerController from "../controller/playerController";

export const getRouter = (mongoDB: any) => {
    const router = express.Router();
    const playerController = PlayerController.playerController(mongoDB);

    router.get("/matches", playerController.getMatches);
    router.get("/scores", playerController.getScores);
    router.put("/scores/:player", playerController.updateScore);
    router.post("/player", playerController.saveNewPlayer);
    router.post("/update/kpi", playerController.updateKPI);

    return router;
};