import {
  afterEach, describe, expect, it,
  jest,
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

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toEqual('e@e.com');
  });
});

let idResposta;

describe('POST em /editoras', () => {
  it('Deve adicionar uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .send({
        nome: 'CDC',
        cidade: 'Sao Paulo',
        email: 'teste@teste.com',
      }).expect(201);
    idResposta = resposta.body.content.id;
  });
  it('Deve não adicionar nada ao passar o body vazio', async () => {
    await request(app).post('/editoras').send({}).expect(400);
  });
});

describe('PUT em /editoras', () => {
  test.each([
    { nome: 'Casa do Código' },
    { cidade: 'SP' },
    { email: 'cdc@cdc.com' },
  ])('Deve altera o campo nome', async (param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app).put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);
    expect(spy).toHaveBeenCalled();
  });
});

describe('DELETE em /editoras/idFornecido', () => {
  it('Deletar o recurso adicionado', async () => {
    await request(app).delete(`/editoras/${idResposta}`).expect(200);
  });
});

describe('GET em /editoras/idFornecido', () => {
  it('Retorna o recurso adicionado', async () => {
    await request(app).get(`/editoras/${idResposta}`).expect(200);
  });
});
