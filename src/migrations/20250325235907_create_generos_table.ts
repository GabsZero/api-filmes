import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('generos', (table) => {
    table.increments('id')
    table.string('nome_exibicao')
    table.string('nome_interno')
    table.timestamps()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('generos');
}

