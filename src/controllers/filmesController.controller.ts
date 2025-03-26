import { Request, Response } from "express"
import database from "../database/config"
import { Filme } from "../entidades/filme"

export const getFilmes = async (req: Request, res: Response) => {
  const filmes: Array<Filme> = await database.
    table('filmes').
    innerJoin("generos", "filmes.genero_id", "=", "generos.id")
    .select([
      'filmes.nome',
      'generos.nome_exibicao as genero',
      'filmes.created_at',
      'filmes.updated_at'
    ]).returning("*")
  res.json(filmes)
}