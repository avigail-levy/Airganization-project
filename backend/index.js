import express from 'express';
import usersRoutes from './routes/users.js';

const app = express();
app.use(express.json());
app.use('/api/users', usersRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
