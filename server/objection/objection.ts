import Knex from "knex";
import { Model } from "objection";
const { connection } = require("../config");

const knex = Knex({
  client: "mysql",
  connection: connection
});

export default Model.knex(knex);
