import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usersRoutes from './routes/users.js';
import vacationsRoutes from './routes/vacations.js';
import tripsRoutes from './routes/trips.js';
import picturesRoutes from './routes/pictures.js';
import continentsRoutes from './routes/continents.js';
import destinationsRoutes from './routes/destinations.js';
import ordersRoutes from './routes/orders.js';

import cors from 'cors';

const app = express();
app.use(cors());
app.use(cors({
  exposedHeaders: ['x-new-token'] // ← זה מאפשר ללקוח לראות את הכותרת
}));
app.use(express.json());

app.use('/api/users', usersRoutes);
app.use('/api/vacationPackages', vacationsRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/pictures', picturesRoutes);
app.use('/api/continents',continentsRoutes);
app.use('/api/destinations',destinationsRoutes);
app.use('/api/orders',ordersRoutes);




app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
