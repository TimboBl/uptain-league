import * as express from "express";

export const getRouter = () => {
    const router = express.Router();

    router.get("/login");
};