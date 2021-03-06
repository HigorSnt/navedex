import * as Knex from 'knex';
import { USERS } from '../../constants/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    USERS,
    function (table: Knex.CreateTableBuilder) {
      table.string('email').primary().notNullable();
      table.string('password_hash').notNullable();
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(USERS);
}
