import express from 'express';
import usersRoutes from './routes/users.js';

const app = express();
import cors from 'cors';
app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);

app.listen(3000, () => {
  console.log('server is running on port 3000');
});
