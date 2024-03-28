import { Pool, PoolClient } from "pg";
import { config } from "../common/config";

const pool = new Pool({
  connectionString: config.databaseUrl,
});

export class PostgresDriver {
  async fetch<ResponseType, ARGType>(
    sql: string,
    ...arg: any
  ): Promise<ResponseType> {
    const client: PoolClient = await pool.connect();

    try {
      const {
        rows: [data],
      } = await client.query(sql, arg);

      return data;
    } finally {
      client.release();
    }
  }

  async fetchAll<ResponseType, ARGType = any>(
    sql: string,
    ...arg: any
  ): Promise<ResponseType[]> {
    const client: PoolClient = await pool.connect();

    try {
      const { rows } = await client.query(sql, arg);

      return rows;
    } finally {
      client.release();
    }
  }

  get getPool(): Pool {
    return pool;
  }
}
