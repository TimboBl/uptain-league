import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

const startApp = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(cors());
};