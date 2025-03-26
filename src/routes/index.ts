import { Router, Request, Response } from 'express';
import { getGeneros } from '../controllers/generosController.controllers';


export const initRoutes = (): Router => {
  const route = Router()

  route.get('/generos', getGeneros)


  return route
}

