import Review from '../models/reviewModel.js';

// ✅ Create Review
export const createReview = async (req, res) => {
    try {
        const { content, authorName, authorTitle } = req.body;
        if (!content || !authorName || !req.file) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields and upload an image' });
        }

        const authorImage = `/uploads/${req.file.filename}`;
        const review = await Review.create({ content, authorName, authorImage, authorTitle });
        res.status(201).json({ success: true, message: 'Review created successfully', review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Reviews
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Review by ID
export const getReviewById = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
        res.status(200).json({ success: true, review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Review
export const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (req.file) {
            updateData.authorImage = `/uploads/${req.file.filename}`;
        }

        const review = await Review.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
        res.status(200).json({ success: true, message: 'Review updated successfully', review });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Review
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) return res.status(404).json({ success: false, message: 'Review not found' });
        res.status(200).json({ success: true, message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};