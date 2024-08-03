import {
  Database,
  MongoClient,
} from 'https://deno.land/x/mongo@v0.33.0/mod.ts';

const client = new MongoClient();

let db: Database;

export async function connect() {
  // Connecting using srv url
  await client.connect(Deno.env.get('MONGO_DB_URL')!);
  db = client.database('todo-app');
}
export async function getDb() {
  await connect();
  return db;
}
