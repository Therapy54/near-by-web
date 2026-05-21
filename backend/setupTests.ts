// backend/setupTests.ts
// Loaded into Jest vmContext BEFORE any test file or module under test.
// Declares 'src/shared/db/pool' as a manual mock here so every
// require('src/shared/db/pool') and every import(…) resolve to the SAME mock
// instance throughout a single test file.
//
// One mock object per test file (clean slate via beforeEach on the mock object).

let mockQuery: jest.Mock = jest.fn(async () => ({ rows: [] }));

// allow individual tests to reconfigure in-place without re-mocking
(globalThis as any).__setPoolMock = (fn: jest.Mock) => { mockQuery = fn; };
(globalThis as any).__poolMock = mockQuery;

jest.mock('src/shared/db/pool', () => ({
  pool: {},
  query: mockQuery,
}));
