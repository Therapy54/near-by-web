// test/profiles/profiles.test.ts — Profile service unit tests
import { jest, test, describe, expect, beforeEach } from '@jest/globals';

type Row = Record<string, any>;

let mockQuery = jest.fn<any>();

jest.mock('../../src/shared/db/pool', () => ({
  query: mockQuery,
  pool: { query: mockQuery },
}));

let profilesService: typeof import('../../src/profiles/service');

const R = (p: Row) => ({ ...p });

beforeEach(() => {
  jest.resetModules();
  mockQuery.mockReset();
  profilesService = require('../../src/profiles/service');
});

describe('getProfileByUserId', () => {
  test('returns first row when profile exists', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ id: 'p1', bio: 'hello', userid: 'u1' })] });
    let result = await profilesService.getProfileByUserId('u1');
    expect(result).toMatchObject({ id: 'p1', bio: 'hello' });
  });

  test('returns null when no profile exists', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    let result = await profilesService.getProfileByUserId('x');
    expect(result).toBeNull();
  });
});

describe('createProfile', () => {
  test('INSERTs userId and all fields', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ id: 'n1', userid: 'u1', skills: ['a', 'b'] })] });
    await profilesService.createProfile('u1', { bio: 'hi', skills: ['a', 'b'], availability: 'open' });
    let callArgs = mockQuery.mock.calls[0] as [string, any[]];
    let sql = callArgs[0];
    let params = callArgs[1];
    expect(sql).toContain('INSERT INTO "Profile"');
    expect(params[0]).toBe('u1');
    expect(params[1]).toBe('hi');
    expect(params[4]).toBe('open');
    expect(params[5]).toEqual(['a', 'b']);
  });

  test('nulls omitted string fields', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ id: 'n' })] });
    await profilesService.createProfile('u1', {});
    let callArgs = mockQuery.mock.calls[0] as [string, any[]];
    let params = callArgs[1];
    expect(params[1]).toBeNull();
    expect(params[2]).toBeNull();
    expect(params[3]).toBeNull();
    expect(params[4]).toBeNull();
    expect(params[6]).toBeNull();
  });
});

describe('updateProfile', () => {
  test('dynamic SET + updatedat', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ userid: 'u1', bio: 'new', location: 'Lagos' })] });
    await profilesService.updateProfile('u1', { bio: 'new', location: 'Lagos' });
    let callArgs = mockQuery.mock.calls[0] as [string, any[]];
    let sql = callArgs[0];
    let params = callArgs[1];
    expect(sql).toContain('bio =');
    expect(sql).toContain('location =');
    expect(sql).toContain('updatedat =');
    expect(params[0]).toBe('new');
    expect(params[1]).toBe('Lagos');
  });

  test('returns existing profile with empty payload', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ id: 'p1', bio: 'unchanged', userid: 'u1' })] });
    let result = await profilesService.updateProfile('u1', {});
    expect(result).toMatchObject({ id: 'p1', bio: 'unchanged' });
  });
});

describe('upsertProfile', () => {
  test('creates when no record exists', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [] })
      .mockResolvedValueOnce({ rows: [R({ id: 'n1', bio: 'fresh' })] });
    let result = await profilesService.upsertProfile('u1', { bio: 'fresh' });
    expect(result.id).toBe('n1');
  });

  test('updates when record exists', async () => {
    mockQuery
      .mockResolvedValueOnce({ rows: [R({ id: 'p1', userid: 'u1' })] })
      .mockResolvedValueOnce({ rows: [R({ id: 'p1', bio: 'changed' })] });
    let result = await profilesService.upsertProfile('u1', { bio: 'changed' });
    expect(result.bio).toBe('changed');
    expect(result.id).toBe('p1');
  });
});