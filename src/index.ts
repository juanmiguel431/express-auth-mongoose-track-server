import express from 'express';
import 'dotenv/config'
import MongoDbWrapperClient from './apis/mongoDbWrapperClient';
import MongoDbCollectionManager from './apis/mongoDbCollectionManager';
import authRoutes from './routes/auth';

const mongoDbClient = new MongoDbWrapperClient();

mongoDbClient.client.connect().then(() => {
  console.log('Connected to Mongo Instance');
}).catch((reason) => {
  console.log('Error connecting to Mongo', reason);
})

// const collectionManager = new MongoDbCollectionManager(mongoDbClient.client, '');


const app = express();

app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
