const server = require('../index.ts');
const request = require('supertest');
import { describe, it, expect } from '@jest/globals';
const requestWithSupertest = request(server);


describe('Filmes', () => {
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
});
