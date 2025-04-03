import { Request, Response } from "express"
import database from "../database/config"
import { Genero } from "../entidades/genero"

export const getGeneros = async (req: Request, res: Response) => {
  const generos: Array<Genero> = await database.table('generos').select("*").returning("*").orderBy('nome_exibicao', 'asc')

  res.json({
    message: 'Generos listados com sucesso!',
    data: generos,
    success: true
  })
}