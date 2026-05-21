// test/portfolio/portfolio.test.ts — Portfolio service unit tests
import { jest, test, describe, expect, beforeEach } from '@jest/globals';

type Row = Record<string, any>;

let mockQuery = jest.fn<any>();

jest.mock('../../src/shared/db/pool', () => ({
  query: mockQuery,
  pool: { query: mockQuery },
}));

let portfolioService: typeof import('../../src/portfolio/service');

const R = (p: Row) => ({ ...p });

beforeEach(() => {
  jest.resetModules();
  mockQuery.mockReset();
  portfolioService = require('../../src/portfolio/service');
});

describe('createPortfolioItem', () => {
  test('inserts userId and all fields', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ id: 'p1', userid: 'u1', title: 'Project' })] });
    await portfolioService.createPortfolioItem('u1', { title: 'Project', description: 'A project' });
    let callArgs = mockQuery.mock.calls[0] as [string, any[]];
    let sql = callArgs[0];
    let params = callArgs[1];
    expect(sql).toContain('INSERT INTO "Portfolio"');
    expect(params[0]).toBe('u1');
    expect(params[1]).toBe('Project');
  });
});

describe('getPortfolioItems', () => {
  test('returns items for user', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ id: 'p1', title: 'Item 1' }), R({ id: 'p2', title: 'Item 2' })] });
    let result = await portfolioService.getPortfolioItems('u1');
    expect(result).toHaveLength(2);
    expect(result[0].title).toBe('Item 1');
  });
});

describe('getPortfolioItemById', () => {
  test('returns item when found', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ id: 'p1', title: 'Single' })] });
    let result = await portfolioService.getPortfolioItemById('p1');
    expect(result).toMatchObject({ id: 'p1', title: 'Single' });
  });

  test('returns null when not found', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [] });
    let result = await portfolioService.getPortfolioItemById('x');
    expect(result).toBeNull();
  });
});

describe('updatePortfolioItem', () => {
  test('updates allowed fields', async () => {
    mockQuery.mockResolvedValueOnce({ rows: [R({ id: 'p1', title: 'Updated' })] });
    await portfolioService.updatePortfolioItem('p1', 'u1', { title: 'Updated' });
    let callArgs = mockQuery.mock.calls[0] as [string, any[]];
    let sql = callArgs[0];
    expect(sql).toContain('title =');
    expect(sql).toContain('updatedat =');
  });
});

describe('deletePortfolioItem', () => {
  test('deletes item successfully', async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 1 });
    let result = await portfolioService.deletePortfolioItem('p1', 'u1');
    expect(result).toBe(true);
  });

  test('returns false when not found', async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 0 });
    let result = await portfolioService.deletePortfolioItem('p1', 'u1');
    expect(result).toBe(false);
  });
});