import * as Knex from 'knex';
import { PROJECTS } from '../../constants/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    PROJECTS,
    function (table: Knex.CreateTableBuilder) {
      table.increments('id').notNullable();
      table.string('name').notNullable();

      table
        .integer('naver_id')
        .notNullable()
        .references('id')
        .inTable('navers')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(PROJECTS);
}
