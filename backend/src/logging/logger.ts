import * as winston from "winston";

export const logger = (() => {
    return new winston.Logger({
        level: process.env.LOG_LEVEL || "debug",
        transports: [
            new winston.transports.Console({colorize: true}),
            new winston.transports.File({filename: "events.log"})
        ],
        exitOnError: false
    });
})();