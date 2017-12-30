import * as express from "express";

export const getRouter = () => {
    const router = express.Router();

    router.get("/scores");
    router.put("/scores/:player");

    return router;
};