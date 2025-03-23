import express from 'express';
import cors from 'cors';
import { PORT } from './src/config/env.js';
import { connectDB } from './src/config/db.js';
import categoryRoutes from './src/routes/categoryRoutes.js';
import commentRoutes from './src/routes/commentRoutes.js';
import reviewRoutes from './src/routes/reviewRoutes.js';
import serviceRoutes from './src/routes/serviceRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import orderRoutes from './src/routes/orderRoutes.js'
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/categories', categoryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Repairing Center API!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
