import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import {logger} from "./logging/logger";
import * as scoreKeeping from "./routes/scoreKeeping";
import * as access from "./routes/access";

export const startApp = (mongoDB: any) => {
    return new Promise((resolve: Function) => {
        logger.debug("Starting app");
        const app = express();

        app.use((req, res, next) => {
            logger.info("New Request", {url: req.url});
        });

        logger.debug("Instantiating middlewares");
        app.use(bodyParser.json());
        app.use(cors());

        logger.debug("Registering routes");

        app.use(access.getRouter());
        app.use("/board", scoreKeeping.getRouter(mongoDB));

        app.listen(process.env.PORT || 3001);
        resolve();
    });
};