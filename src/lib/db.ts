import { Pool, type QueryResultRow } from "pg";

let pool: Pool | null = null;

function getPool(): Pool {
  if (pool) return pool;
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  pool = new Pool({ connectionString, max: 5 });
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(sql: string, params: unknown[] = []) {
  const client = await getPool().connect();
  try {
    const result = await client.query<T>(sql, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

export async function queryOne<T extends QueryResultRow = QueryResultRow>(sql: string, params: unknown[] = []) {
  const rows = await query<T>(sql, params);
  return rows[0] ?? null;
}


