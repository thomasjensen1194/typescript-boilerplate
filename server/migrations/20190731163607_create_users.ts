import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable('users', (t) => {
    t.increments();
    t.string('username').notNullable();
    t.string('password').notNullable();
    t.string("email")
    t.timestamps();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable('users');
}
