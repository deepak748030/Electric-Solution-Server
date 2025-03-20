import express from 'express';
import cors from 'cors';
import { PORT } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import categoryRoutes from './src/routes/categoryRoutes.js'

const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/categories', categoryRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Repairing Center API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
