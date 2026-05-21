// test/profiles/spy_format.test.ts — Verify spy works with mocked pool
import { jest, test, expect, beforeEach } from '@jest/globals';

let mockQuery = jest.fn<any>();

jest.mock('../../src/shared/db/pool', () => ({
  query: mockQuery,
  pool: { query: mockQuery },
}));

let profilesService: typeof import('../../src/profiles/service');

beforeEach(() => {
  jest.resetModules();
  mockQuery.mockReset();
  profilesService = require('../../src/profiles/service');
});

test('verify spy captures calls correctly', async () => {
  mockQuery.mockResolvedValueOnce({ rows: [{ id: 'n' }] });
  let result = await profilesService.getProfileByUserId('u1');
  expect(result.id).toBe('n');
  expect(mockQuery).toHaveBeenCalledTimes(1);
  expect(mockQuery).toHaveBeenCalledWith(
    expect.stringContaining('SELECT'),
    ['u1']
  );
});