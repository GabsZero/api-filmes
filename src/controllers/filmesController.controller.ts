import { Request, Response } from "express"
import database from "../database/config"
import { Filme } from "../entidades/filme"
import { CreateFilmeDto } from "../dtos/createFilmeDto.dtos"
import { validate } from "class-validator"

const { DateTime } = require("luxon");


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

export const storeFilme = async (req: Request, res: Response) => {
  let filme = new CreateFilmeDto()
  filme.nome = req.body.nome
  filme.genero_id = parseInt(req.body.genero_id as string)
  filme.created_at = DateTime.now()
  filme.updated_at = DateTime.now()

  const errors = await validate(filme)
  if (errors.length > 0) {
    let response: Array<string> = []
    errors.map(err => {
      return Object.keys(err.constraints).forEach(value => {
        response.push(err.constraints[value])
      })

    })
    res.status(400).json({
      data: response,
      success: false
    })
  }

  const result = await database.insert(filme).into('filmes')

  res.status(201).json({
    message: 'Filme criado com sucesso!',
    data: filme,
    success: true
  })
}
