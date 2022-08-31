import { afterEach, describe, it } from '@jest/globals';
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
    await request(app)
      .get('/editoras')
      .expect(200);
  });
});
