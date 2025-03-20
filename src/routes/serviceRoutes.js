// routes/serviceRoutes.js
import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import { createService, getAllServices, getServiceById, updateService, deleteService } from '../controllers/serviceController.js';

const router = express.Router();


// ✅ Create Service
router.post('/', upload.fields([{ name: 'image' }, { name: 'providerImage' }]), createService);

// ✅ Get All Services
router.get('/', getAllServices);

// ✅ Get Service by ID
router.get('/:id', getServiceById);

// ✅ Update Service
router.patch('/:id', upload.fields([{ name: 'image' }, { name: 'providerImage' }]), updateService);

// ✅ Delete Service
router.delete('/:id', deleteService);

export default router;