import express from 'express'

import knex from 'knex';

import { Router, Request, Response } from 'express';

const app = express();

const route = Router()

app.use(express.json())

const database = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5433,
    user: 'postgres',
    password: 'postgres',
    database: 'api_filmes',
  },
})

route.get('/', (req: Request, res: Response) => {
  res.json({ message: 'hello world with Typescript atualizado' })
})

app.use(route)


app.listen(3333, () => 'server running on port 3333')