import { Request, Response } from "express"
import database from "../database/config"
import { CreateFilmeDto } from "../dtos/createFilmeDto.dtos"
import { validate, ValidationError } from "class-validator"
import { gravarFilmeService } from "../Domains/Filmes/GravarFilmeAction"
import logger from "../utils/logger"
import { marcarFilmeAssistidoAction } from "../Domains/Filmes/marcarFilmeAssistidoAction"
import { getFilmesAction } from "../Domains/Filmes/GetFilmesAction"

export const getFilmes = async (req: Request, res: Response) => {

  const page: number = parseInt(req.query.page as string) || 1
  const perPage: number = parseInt(req.query.per_page as string) || 10;
  const assistido: string = req.query.assistido as string

  try {
    const filmes = await getFilmesAction(page, perPage, assistido)
    res.json({
      success: true,
      message: 'Filmes encontrados com sucesso!',
      ...filmes,
    })
  } catch (error: any) {
    logger.error({
      message: error.message,
      stack: error.stack,
      page: page,
      perPage: perPage,
      assistido: assistido
    })

    res.status(500).json({
      message: 'Erro ao buscar filmes!',
      success: false
    })
  }
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
    await gravarFilmeService(filme)

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

  if (!id) {
    res.status(400).json({
      message: 'O filme não é válido ou não foi encontrado!',
      success: false
    })
    return
  }

  try {
    const filmeFoiMarcado = await marcarFilmeAssistidoAction(id)

    if (!filmeFoiMarcado) {
      res.status(404).json({
        message: 'Filme não encontrado!',
        success: false
      })
      return
    }
    res.status(200).json({
      message: 'Filme assistido com sucesso!',
      data: null,
      success: true
    })
  } catch (error: any) {
    logger.error({
      message: error.message,
      stack: error.stack,
      filmeId: id
    })

    res.status(500).json({
      message: 'Erro ao marcar filme como assistido!',
      success: false
    })
  }
}

export const apagarFilme = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id as string)

  const filmeFoiApagado = await database.table('filmes').where('id', id).delete()

  if (!filmeFoiApagado) {
    res.status(404).json({
      message: 'Filme não encontrado!',
      success: false
    })
    return
  }

  res.status(200).json({
    message: 'Filme apagado com sucesso!',
    data: null,
    success: true
  })
}
