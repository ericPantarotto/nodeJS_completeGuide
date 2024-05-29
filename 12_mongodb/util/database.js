import { MongoClient } from 'mongodb';

const mongoConn = cb => {
  const client = new MongoClient(process.env.MONGO_DB_URL);
  client
    .connect()
    .then(client => {
      console.log('Connected to mongodb Atlas');
      cb(client);
    })
    .catch(err => console.error(err));
};

export const mongoConnect = mongoConn;
