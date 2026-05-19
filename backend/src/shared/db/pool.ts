// shared/db/pool.ts — canonical PostgreSQL pg Pool
// All code should import from here;  lib/db.ts is a legacy re-export shim.
import { Pool } from 'pg';

let pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export let query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export { pool };
