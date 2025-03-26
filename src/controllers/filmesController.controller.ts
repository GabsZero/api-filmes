import { Request, Response } from "express"
import database from "../database/config"
import { Filme } from "../entidades/filme"

export const getFilmes = async (req: Request, res: Response) => {

  const page: number = parseInt(req.query.page as string) || 1
  const perPage: number = parseInt(req.query.per_page as string) || 10;

  // @ts-ignore
  const filmes: Array<Filme> = await database.
    table('filmes').
    innerJoin("generos", "filmes.genero_id", "=", "generos.id")
    .select([
      'filmes.nome',
      'generos.nome_exibicao as genero',
      'filmes.created_at',
      'filmes.updated_at'
      // @ts-ignore
    ]).paginate({
      perPage: perPage,
      currentPage: page
    })
  res.json(filmes)
}
