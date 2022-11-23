import express from "express";
import http from "http";
import { json } from "body-parser";
import cors from "cors";
import { config } from "./config";
import router from "./routes";

import setupPassport from "./passport";

setupPassport();

const app = express();

app.use(cors());
app.use(json());
app.use(router);

const server = http.createServer(app);

console.log(`Listening on: ${config.host}:${config.port}`);

server.listen(config.port, config.host);
