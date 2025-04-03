import { Router, Request, Response } from 'express';
import { getGeneros } from '../controllers/generosController.controllers';
import { getFilmes, storeFilme, marcarFilmeAssistido } from '../controllers/filmesController.controller';


export const v1 = (): Router => {
  const route = Router()

  route.get('/generos', getGeneros)
  route.get('/filmes', getFilmes)
  route.post('/filmes', storeFilme)
  route.post('/filmes/assistido/:id', marcarFilmeAssistido)


  return route
}

