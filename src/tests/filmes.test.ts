const server = require('../index.ts');
const request = require('supertest');
import { describe, it, expect } from '@jest/globals';
import database from '../database/config';
const requestWithSupertest = request(server);



describe('Filmes', () => {

  afterAll(() => {
    database.table("filmes").where("nome", "=", "Teste").where("genero_id", "=", "2").delete();
  });

  it('deve retornar uma lista de filmes', async () => {
    const response = await requestWithSupertest.get('/api/v1/filmes');
    const filme = response.body.data[0];

    expect(response.status).toBe(200);
    expect(response.body.data).toBeInstanceOf(Array);
    expect(filme).toHaveProperty('id');
    expect(filme).toHaveProperty('nome');
    expect(filme).toHaveProperty('genero');
    expect(filme).toHaveProperty('assistido');
    expect(filme).toHaveProperty('created_at');
    expect(filme).toHaveProperty('updated_at');
  });

  it('deve criar um filme', async () => {
    const response = await requestWithSupertest.post('/api/v1/filmes').send({
      nome: 'Teste',
      genero_id: '2',
    });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('nome');
    expect(response.body.data).toHaveProperty('genero_id');
  })

  it('deve marcar um filme como assistido', async () => {
    const filme = await database.table("filmes").where("nome", "=", "Teste").where("genero_id", "=", "2").first();

    const response = await requestWithSupertest.post(`/api/v1/filmes/assistido/${filme.id}`).send();
    expect(response.status).toBe(200);
  });

  it('deve apagar um filme', async () => {
    const filme = await database.table("filmes").where("nome", "=", "Teste").where("genero_id", "=", "2").first();
    const response = await requestWithSupertest.delete(`/api/v1/filmes/${filme.id}`).send();

    expect(response.status).toBe(200);
  })
})




