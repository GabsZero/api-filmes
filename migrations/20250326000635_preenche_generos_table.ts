import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  const generos = [
    {
      "nome_exibicao": "Ação",
      "nome_interno": "acao"
    },
    {
      "nome_exibicao": "Aventura",
      "nome_interno": "aventura"
    },
    {
      "nome_exibicao": "Animação",
      "nome_interno": "animacao"
    },
    {
      "nome_exibicao": "Comédia",
      "nome_interno": "comedia"
    },
    {
      "nome_exibicao": "Crime",
      "nome_interno": "crime"
    },
    {
      "nome_exibicao": "Documentário",
      "nome_interno": "documentario"
    },
    {
      "nome_exibicao": "Drama",
      "nome_interno": "drama"
    },
    {
      "nome_exibicao": "Fantasia",
      "nome_interno": "fantasia"
    },
    {
      "nome_exibicao": "Ficção Científica",
      "nome_interno": "ficcao-cientifica"
    },
    {
      "nome_exibicao": "Guerra",
      "nome_interno": "guerra"
    },
    {
      "nome_exibicao": "Mistério",
      "nome_interno": "misterio"
    },
    {
      "nome_exibicao": "Musical",
      "nome_interno": "musical"
    },
    {
      "nome_exibicao": "Romance",
      "nome_interno": "romance"
    },
    {
      "nome_exibicao": "Suspense",
      "nome_interno": "suspense"
    },
    {
      "nome_exibicao": "Terror",
      "nome_interno": "terror"
    },
    {
      "nome_exibicao": "Western",
      "nome_interno": "western"
    }
  ];
  knex.batchInsert("generos", generos)
}


export async function down(knex: Knex): Promise<void> {
}

