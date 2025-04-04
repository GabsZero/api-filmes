
import { QueryBuilder } from "knex";
import database from "../../database/config";

export const getFilmesAction = async (page: number, perPage: number, assistido: string): Promise<any> => {
  const filmesQuery: QueryBuilder = database.
    table('filmes').
    innerJoin("generos", "filmes.genero_id", "=", "generos.id")
    .select([
      'filmes.id',
      'filmes.nome',
      'generos.nome_exibicao as genero',
      'filmes.assistido',
      'filmes.created_at',
      'filmes.updated_at'
    ])

  if (assistido) {
    // @ts-ignore
    filmesQuery.where('filmes.assistido', '=', assistido)
  }

  // @ts-ignore
  const filmes = await filmesQuery.paginate({
    perPage: perPage,
    currentPage: page
  })

  return filmes
};

