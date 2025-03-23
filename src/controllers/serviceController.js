import Service from '../models/serviceModel.js';
import { IMAGE_UPLOAD_URL } from '../config/env.js';

// ✅ Create Service
export const createService = async (req, res) => {
    try {
        console.log(req.body);
        const { title, price, category, providerName, type, locations } = req.body;
        if (!title || !price || !category || !providerName || !type || !locations) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields and upload images' });
        }

        // Set empty values if no images are uploaded
        const image = req.files?.image?.[0]?.filename ? `${IMAGE_UPLOAD_URL}/uploads/${req.files.image[0].filename}` : '';
        const providerImage = req.files?.providerImage?.[0]?.filename ? `${IMAGE_UPLOAD_URL}/uploads/${req.files.providerImage[0].filename}` : '';

        const parsedLocations = Array.isArray(locations) ? locations : JSON.parse(locations);

        const service = await Service.create({ title, price, image, category, providerName, providerImage, type, locations: parsedLocations });
        res.status(201).json({ success: true, message: 'Service created successfully', service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllServices = async (req, res) => {
    try {
        const { type, limit } = req.query;

        const filter = type ? { type } : {};
        const query = Service.find(filter).sort({ createdAt: -1 });

        // Apply limit if provided and is a valid number
        if (limit && !isNaN(limit)) {
            query.limit(Number(limit));
        }

        const services = await query;
        res.status(200).json({ success: true, services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Service by ID
export const getServiceById = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findById(id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
        res.status(200).json({ success: true, service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Service
export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        console.log(req.body);

        if (updateData.price) {
            updateData.price = Number(updateData.price);
        }

        if (req.files) {
            if (req.files.image) updateData.image = `${IMAGE_UPLOAD_URL}/uploads/${req.files.image[0].filename}`;
            if (req.files.providerImage) updateData.providerImage = `${IMAGE_UPLOAD_URL}/uploads/${req.files.providerImage[0].filename}`;
        }

        if (updateData.locations) {
            updateData.locations = Array.isArray(updateData.locations) ? updateData.locations : JSON.parse(updateData.locations);
        }

        const service = await Service.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
        res.status(200).json({ success: true, message: 'Service updated successfully', service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Service
export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const service = await Service.findByIdAndDelete(id);
        if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
        res.status(200).json({ success: true, message: 'Service deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};