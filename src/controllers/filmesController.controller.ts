import { Request, Response } from "express"
import database from "../database/config"
import { CreateFilmeDto } from "../dtos/createFilmeDto.dtos"
import { validate, ValidationError } from "class-validator"
import { QueryBuilder } from "knex"
import { GravarFilmeService } from "../Domains/Filmes/GravarFilmeService"
import logger from "../utils/logger"


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

export const helloWorld = async (req: Request, res: Response) => {
  res.send("Express on Vercel")
}

export const gravarFilme = async (req: Request, res: Response) => {
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

  try {
    await GravarFilmeService(filme)

    res.status(201).json({
      message: 'Filme criado com sucesso!',
      data: filme,
      success: true
    })
  } catch (error: any) {

    logger.error({
      message: error.message,
      stack: error.stack,
      filme: filme
    })

    res.status(500).json({
      message: 'Erro ao criar filme!',
      success: false
    })
  }
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

export const apagarFilme = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id as string)

  const filme = await database.table('filmes').where('id', id).delete()

  res.status(200).json({
    message: 'Filme apagado com sucesso!',
    data: null,
    success: true
  })
}
