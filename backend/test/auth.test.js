const request = require('supertest');
const app = require('../src/index');

describe('Auth API Endpoints', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(4501, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  test('Health endpoint should return OK', async () => {
    const response = await request(server).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('OK');
  });

  test('API root endpoint should return message', async () => {
    const response = await request(server).get('/api');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.message).toBe('Near-By API is running');
  });

  test('Register endpoint should exist and handle missing fields', async () => {
    const response = await request(server)
      .post('/api/auth/register')
      .send({}); // Empty body
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('Email and password are required');
  });

  test('Login endpoint should exist and handle missing fields', async () => {
    const response = await request(server)
      .post('/api/auth/login')
      .send({}); // Empty body
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('Email and password are required');
  });

  test('Verify token endpoint should exist and handle missing token', async () => {
    const response = await request(server)
      .get('/api/auth/verify')
      .set('Authorization', ''); // Empty token
    
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('No token provided');
  });
});
