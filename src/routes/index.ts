import { Router, Request, Response } from 'express';
import { getGeneros } from '../controllers/generosController.controllers';
import { getFilmes, storeFilme } from '../controllers/filmesController.controller';


export const initRoutes = (): Router => {
  const route = Router()

  route.get('/generos', getGeneros)
  route.get('/filmes', getFilmes)
  route.post('/filmes', storeFilme)


  return route
}

