import { Router, Request, Response } from 'express';
import { getGeneros } from '../controllers/generosController.controllers';
import { getFilmes } from '../controllers/filmesController.controller';


export const initRoutes = (): Router => {
  const route = Router()

  route.get('/generos', getGeneros)
  route.get('/filmes', getFilmes)


  return route
}

