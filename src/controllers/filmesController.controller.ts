import { Request, Response } from "express"
import database from "../database/config"
import { Filme } from "../entidades/filme"
import { CreateFilmeDto } from "../dtos/createFilmeDto.dtos"
import { validate, ValidationError } from "class-validator"
import { QueryBuilder } from "knex"


export const getFilmes = async (req: Request, res: Response) => {

  const page: number = parseInt(req.query.page as string) || 1
  const perPage: number = parseInt(req.query.per_page as string) || 10;
  const assistido: string = req.query.assistido as string

  // @ts-ignore
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

  res.json(filmes)
}

export const storeFilme = async (req: Request, res: Response) => {
  let filme = new CreateFilmeDto(req.body.nome, parseInt(req.body.genero_id as string))

  const errors: ValidationError[] = await validate(filme)
  if (errors.length > 0) {
    let response: Array<string> = []
    errors.map((err: ValidationError) => {
      const constraints = err.constraints ? err.constraints : {}

      return Object.keys(constraints).forEach(value => {
        response.push(constraints[value])
      })

    })

    res.status(400).json({
      data: response,
      success: false
    })
    return
  }

  const result = await database.insert(filme).into('filmes')

  res.status(201).json({
    message: 'Filme criado com sucesso!',
    data: filme,
    success: true
  })
}

export const marcarFilmeAssistido = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id as string)

  const filme = await database.table('filmes').where('id', id).update({ assistido: true })

  res.status(200).json({
    message: 'Filme assistido com sucesso!',
    data: filme,
    success: true
  })
}
