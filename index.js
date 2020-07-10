require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 8000;

const server = express();

server.use(express.json());


server.listen(PORT, () => console.log(`Port ${PORT}. Server is listening...`));