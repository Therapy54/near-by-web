# SQL Migrations

PostgreSQL folds unquoted identifiers to lowercase. The user table is created with
a quoted identifier `"User"`, so raw queries must preserve the exact casing.

Always use `"User"` (double-quoted) in queries — never bare `User`.

Run a migration from the backend directory:

```bash
node -e "require('dotenv').config(); const fs = require('fs'); const { Pool } = require('pg'); const pool = new Pool({ connectionString: process.env.DATABASE_URL }); (async () => { await pool.query(fs.readFileSync('sql/000X_description.sql','utf8')); await pool.end(); })();"
```

| File | Description |
|---|---|
| `001_recreate_user_table.sql` | Drops and recreates the User table |
| `002_create_users_view.sql` | Creates `users` view (lowercase, queryable without quotes) |
