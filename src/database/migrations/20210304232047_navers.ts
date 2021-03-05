import * as Knex from 'knex';
import { NAVERS } from '../../constants/tables';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(
    NAVERS,
    function (table: Knex.CreateTableBuilder) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.date('birthdate').notNullable();
      table.string('job_role').notNullable();
      table.date('admission_date').notNullable();

      table
        .integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    }
  );
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(NAVERS);
}
