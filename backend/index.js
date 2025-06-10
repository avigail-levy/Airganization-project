import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usersRoutes from './routes/users.js';
import vacationsRoutes from './routes/vacations.js';
import tripsRoutes from './routes/trips.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/vacationPackages', vacationsRoutes);
app.use('/api/trips', tripsRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
