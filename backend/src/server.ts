import {startApp} from "./app";
import {logger} from "./logging/logger";
import {mongoService} from "./services/mongoService";

global.Promise = require("bluebird");

mongoService.init().then((mongoDB: any) => {
    return startApp(mongoDB);
}).then(() => {
    logger.debug("Server is listening at", {port: process.env.PORT || 3001});
}).catch(() => {
    logger.error("Starting the server failed... \nExiting");
    process.exit(-1);
});