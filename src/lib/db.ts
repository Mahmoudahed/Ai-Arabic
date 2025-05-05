// src/lib/db.ts
import { drizzle } from 'drizzle-orm/vercel-postgres';
import { Pool } from '@vercel/postgres';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL, // تأكد أن المتغير موجود في .env
});

export const db = drizzle(pool);
