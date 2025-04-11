import { Router } from 'express';
import { getGeneros } from '../controllers/generosController.controllers';
import { getFilmes, gravarFilme, marcarFilmeAssistido, apagarFilme } from '../controllers/filmesController.controller';


export const v1 = (): Router => {
  const route = Router()

  route.get('/generos', getGeneros)
  route.get('/filmes', getFilmes)
  route.post('/filmes', gravarFilme)
  route.delete('/filmes/:id', apagarFilme)
  route.post('/filmes/assistido/:id', marcarFilmeAssistido)


  return route
}

