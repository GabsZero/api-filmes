import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('filmes', (table) => {
    table.increments('id')
    table.string('nome')
    table.integer('genero_id').references('generos.id')
    table.timestamps()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('filmes');
}

