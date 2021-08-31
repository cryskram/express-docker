const express = require("express");
const bp = require("body-parser");
const cors = require("cors");
const { log, ExpressAPILogMiddleware } = require("@rama41222/node-logger");

const config = {
	name: "sample-express-app",
	port: 3000,
	host: "0.0.0.0",
};

const app = express();
const logger = log({ console: true, file: false, label: config.name });

app.use(bp.json());
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));

app.get("/", (req, res) => {
	res.status(200).send("Hello world");
});

app.listen(config.port, config.host, (e) => {
	if (e) throw new Error("Internal Server Error - 500");
	logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
