// src/lib/db.ts
import { drizzle } from 'drizzle-orm/vercel-postgres';

// Mock DB for static export
const mockDb = {
  select: () => ({ from: () => ({ where: () => ({ orderBy: () => [] }) }) }),
  insert: () => ({ values: () => ({ returning: () => [{}] }) }),
  update: () => ({ set: () => ({ where: () => ({ returning: () => [{}] }) }) }),
  delete: () => ({ where: () => ({}) })
};

// Only try to connect to the database when running on the server,
// not during static export build
let db;
if (typeof window === 'undefined') {
  try {
    // This will only run on the server
    // Dynamically import to avoid build issues
    const importPool = async () => {
      try {
        const { Pool } = await import('@vercel/postgres');
        const pool = new Pool({
          connectionString: process.env.POSTGRES_URL,
        });
        return drizzle(pool);
      } catch (error) {
        console.warn('Unable to connect to Postgres:', error);
        return mockDb;
      }
    };
    
    // We use a mock database object during build time
    db = mockDb;
    
    // Only attempt to connect in a running server environment
    if (process.env.NODE_ENV === 'production' && !process.env.NEXT_EXPORT) {
      importPool().then(result => {
        db = result;
      });
    }
  } catch (error) {
    console.warn('Using mock database:', error);
    db = mockDb;
  }
} else {
  // Client-side: use mock
  db = mockDb;
}

export { db };
