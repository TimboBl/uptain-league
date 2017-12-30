import * as express from "express";

export const getRouter = () => {
    const router = express.Router();

    router.get("/board/scores");
    router.put("/board/scores/:player");
};