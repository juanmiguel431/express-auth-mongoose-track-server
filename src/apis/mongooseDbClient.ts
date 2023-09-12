import mongoose from 'mongoose';
import { mongooseDbConnectionString } from './contants';

// export const connection = mongoose.createConnection(mongoDbConnectionString);
// connection.once('open', () => {
//   console.log('Connected to Mongo Instance - Mongoose');
// });
//
// connection.on('error', (reason) => {
//   console.log('Error connecting to Mongo', reason);
// });
// export { connection };

mongoose.connect(mongooseDbConnectionString);

// In this case I decide to use the below pattern adding events.
// .then(() => {
//   console.log('Connected to Mongo Instance - Mongoose 1');
// }).catch(reason => {
//   console.log('Error connecting to Mongo', reason);
// });

mongoose.connection.once('open', () => {
  console.log('Connected to Mongo Instance - Mongoose 2');
});

mongoose.connection.on('error', (reason) => {
  console.log('Error connecting to Mongo', reason);
});
