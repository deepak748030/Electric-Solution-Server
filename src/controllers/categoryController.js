import Category from '../models/categoryModel.js';
import { IMAGE_UPLOAD_URL } from '../config/env.js';
// ✅ Create a Category with Image Upload
export const createCategory = async (req, res) => {
    try {
        const { title, servicesCount } = req.body;
        const image = req.file ? `${IMAGE_UPLOAD_URL}/uploads/${req.file.filename}` : null;

        // Validate required fields
        if (!title || !servicesCount) {
            return res.status(400).json({ success: false, message: 'Title, image, and services count are required.' });
        }

        // Validate servicesCount format
        const servicesCountPattern = /^[0-9]+(\+)?\s?Services$/;
        if (!servicesCountPattern.test(servicesCount)) {
            return res.status(400).json({ success: false, message: 'Invalid services count. Example: "1+ Services"' });
        }

        // Save to Database
        const category = new Category({ title, image, servicesCount });
        await category.save();

        res.status(201).json({ success: true, message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 }).select('-createdAt -updatedAt -__v');
        res.status(200).json({ success: true, categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Category by ID
export const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        const category = await Category.findById(id).select('-createdAt -updatedAt -__v');
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

        res.status(200).json({ success: true, category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Category using PATCH
export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        const updateData = { ...req.body };

        if (req.file) {
            updateData.image = `${IMAGE_UPLOAD_URL}/uploads/${req.file.filename}`;
        }

        if (updateData.servicesCount) {
            const servicesCountPattern = /^[0-9]+(\+)?\s?Services$/;
            if (!servicesCountPattern.test(updateData.servicesCount)) {
                return res.status(400).json({ success: false, message: 'Invalid services count. Example: "1+ Services"' });
            }
        }

        const category = await Category.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-createdAt -updatedAt -__v');

        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

        res.status(200).json({ success: true, message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ success: false, message: 'Invalid category ID' });
        }

        const category = await Category.findByIdAndDelete(id);
        if (!category) return res.status(404).json({ success: false, message: 'Category not found' });

        res.status(200).json({ success: true, message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
