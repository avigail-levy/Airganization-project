import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import usersRoutes from './routes/users.js';
import vacationsRoutes from './routes/vacations.js';
import picturesRoutes from './routes/pictures.js';
import continentsRoutes from './routes/continents.js';
import destinationsRoutes from './routes/destinations.js';
import ordersRoutes from './routes/orders.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import cors from 'cors';

const app = express();
app.use(cors());
app.use(cors({
  exposedHeaders: ['x-new-token'] 
}));
app.use(express.json());

app.use('/images', express.static(path.join(process.cwd(), 'images')));

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/api/users', usersRoutes);
app.use('/api/vacationPackages', vacationsRoutes);
app.use('/api/pictures', picturesRoutes);
app.use('/api/continents',continentsRoutes);
app.use('/api/destinations',destinationsRoutes);
app.use('/api/orders',ordersRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
