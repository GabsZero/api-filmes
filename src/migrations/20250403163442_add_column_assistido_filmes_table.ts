import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable('filmes', (table) => {
    table.boolean("assistido").after("genero_id").defaultTo(false)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('filmes', (table) => {
    table.dropColumn('assistido')
  })
}

