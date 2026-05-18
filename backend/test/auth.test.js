const request = require('supertest');
let app = require('../dist/index').default;

describe('Auth API Endpoints', () => {
  test('Health endpoint should return OK', async () => {
    let response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe('OK');
  });

  test('API root endpoint should return message', async () => {
    let response = await request(app).get('/api');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.message).toBe('Near-By API is running');
  });

  test('Register endpoint should reject empty body', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Register endpoint should reject body with only email', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Register endpoint should reject body missing only displayName', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'validpass1' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Register endpoint should reject missing password (all other fields present)', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', displayName: 'Jane' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Register endpoint should reject displayName with only 1 character', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'validpass1', displayName: 'J' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Register endpoint should reject displayName with 25 characters (max is 24)', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'validpass1', displayName: 'a'.repeat(25) });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Register endpoint should reject blank displayName', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'validpass1', displayName: '   ' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Register endpoint should reject password shorter than 8 characters', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'sh0rt', displayName: 'Jane Doe' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Login endpoint should reject empty body', async () => {
    let response = await request(app)
      .post('/api/auth/login')
      .send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('Verify token endpoint should reject missing token', async () => {
    let response = await request(app)
      .get('/api/auth/verify')
      .set('Authorization', '');

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('No token provided');
});
