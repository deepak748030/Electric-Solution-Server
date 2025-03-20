import Service from '../models/serviceModel.js';

// ✅ Create Service
export const createService = async (req, res) => {
    try {
        const { title, price, category, providerName, type } = req.body;
        if (!title || !price || !category || !providerName || !type || !req.files) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields and upload images' });
        }

        const image = `/uploads/${req.files.image[0].filename}`;
        const providerImage = `/uploads/${req.files.providerImage[0].filename}`;

        const service = await Service.create({ title, price: Number(price), image, category, providerName, providerImage, type });
        res.status(201).json({ success: true, message: 'Service created successfully', service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Services
export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ createdAt: -1 });
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

        if (updateData.price) {
            updateData.price = Number(updateData.price);
        }

        if (req.files) {
            if (req.files.image) updateData.image = `/uploads/${req.files.image[0].filename}`;
            if (req.files.providerImage) updateData.providerImage = `/uploads/${req.files.providerImage[0].filename}`;
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
