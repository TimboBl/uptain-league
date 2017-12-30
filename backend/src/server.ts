import {startApp} from "./app";
import {logger} from "./logging/logger";

global.Promise = require("bluebird");

startApp().then(() => {
    logger.debug("Server is listening at", {port: process.env.PORT || 3001});
});