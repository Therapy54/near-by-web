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

  test('Register endpoint should exist and handle missing fields', async () => {
    let response = await request(app)
      .post('/api/auth/register')
      .send({}); // Empty body
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('Email and password are required');
  });

  test('Login endpoint should exist and handle missing fields', async () => {
    let response = await request(app)
      .post('/api/auth/login')
      .send({}); // Empty body
    
    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('Email and password are required');
  });

  test('Verify token endpoint should exist and handle missing token', async () => {
    let response = await request(app)
      .get('/api/auth/verify')
      .set('Authorization', ''); // Empty token
    
    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.error.message).toContain('No token provided');
  });
});
