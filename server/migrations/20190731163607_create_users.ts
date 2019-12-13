import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', (t) => {
    t.increments('user_id');
    t.string('username').notNullable();
    t.string('password').notNullable();
    t.string('email');
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
