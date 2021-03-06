import * as Knex from 'knex';
import { NAVERS_PROJECTS } from '../../constants/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    NAVERS_PROJECTS,
    function (table: Knex.CreateTableBuilder) {
      table.increments('id').primary();
      table
        .integer('naver_id')
        .references('id')
        .inTable('navers')
        .onDelete('CASCADE');
      table
        .integer('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE');
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(NAVERS_PROJECTS);
}
