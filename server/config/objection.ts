import Knex from 'knex';
import { Model } from 'objection';

const knex = Knex({
  client: 'mysql',
  connection: process.env.DB_URL
});

export default Model.knex(knex);
