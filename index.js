require("dotenv").config();
const express = require("express");
const projectsRouter = require("./projects/projectsRouter");
const actionRouter = require("./actions/actionsRouter");

const PORT = process.env.PORT || 8000;

const server = express();

server.use(express.json());
server.use("/api/projects", projectsRouter);
server.use("/api/actions", actionRouter);


server.listen(PORT, () => console.log(`Port ${PORT}. Server is listening...`));