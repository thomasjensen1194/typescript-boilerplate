import Knex from 'knex';
import { Model, knexSnakeCaseMappers } from 'objection';

const knex = Knex({
  client: 'mysql',
  connection: process.env.DB_URL,
  ...knexSnakeCaseMappers() // Handles the conversion of tables and columns as so: created_at -> createdAt
});

export default Model.knex(knex);
