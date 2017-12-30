import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {logger} from "./logging/logger";
import * as scoreKeeping from "./routes/scoreKeeping";
import * as access from "./routes/access";

export const startApp = () => {
    logger.debug("Starting app");
    const app = express();

    logger.debug("Instantiating middlewares");
    app.use(bodyParser.json());
    app.use(cors());

    logger.debug("Registering routes");

    app.use(access.getRouter());
    app.use("/board", scoreKeeping.getRouter());
};