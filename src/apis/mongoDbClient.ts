import { MongoClient, ServerApiVersion } from 'mongodb';
import { mongoDbConnectionString } from './contants';

const mongoDbClient = new MongoClient(mongoDbConnectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

mongoDbClient.connect().then(() => {
  console.log('Connected to Mongo Instance - Native Client');
}).catch((reason) => {
  console.log('Error connecting to Mongo', reason);
}).finally(() => {
  mongoDbClient.close();
});

export default mongoDbClient;
