import * as Knex from 'knex';
import { PROJECTS } from '../../constants/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    PROJECTS,
    function (table: Knex.CreateTableBuilder) {
      table.increments('id').notNullable();
      table.string('name').notNullable();

      table
        .string('user')
        .notNullable()
        .references('email')
        .inTable('users')
        .onDelete('CASCADE');
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(PROJECTS);
}
