import 'dotenv/config'
import './models/User';
import './apis/mongooseDbClient';
import express from 'express';
import authRoutes from './routes/auth';

const app = express();

app.use(express.json());
app.use(authRoutes);

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
