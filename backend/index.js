import express from 'express';
import usersRoutes from './routes/users.js';
import vacationRoutes from './routes/vacations.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/vacationPackages', vacationRoutes);




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
