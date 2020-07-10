require("dotenv").config();
const express = require("express");
const projectsRouter = require("./projects/projectsRouter");

const PORT = process.env.PORT || 8000;

const server = express();

server.use(express.json());
server.use("/api/projects", projectsRouter);


server.listen(PORT, () => console.log(`Port ${PORT}. Server is listening...`));