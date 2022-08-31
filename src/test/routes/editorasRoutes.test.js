import {
  afterEach, describe, expect, it,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});


describe('GET em /editoras', async () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta

describe('POST em /editoras', async () => {
 it('Deve adicionar uma nova editora', async () => {
  const resposta = await request(app)
    .post('/editoras')
    .send({
      nome: 'CDC',
      cidade: 'Sao Paulo',
      email 'teste@teste.com'
    }).expect(201)
 })
 idResposta = resposta.body.content.id
})

describe('DELETE em /editoras/idFornecido', async () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app).delete(`/editoras/${idResposta}`, ).expect(200)
  })

describe('GET em /editoras/idFornecido', async () => {
  it('Retorna o recurso adicionado', async () => {
    await request(app).get(`/editoras/${idResposta}`, ).expect(200)
  })
})
