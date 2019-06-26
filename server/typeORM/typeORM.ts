import "reflect-metadata";
import { createConnection } from "typeorm";
const { connection } = require("../config/index");

createConnection(connection)
  .then(() => {
    console.log("Successfully connected to database");
  })
  .catch(error => console.log(error));
