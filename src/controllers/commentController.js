import Comment from '../models/commentModel.js';

// ✅ Create Comment
export const createComment = async (req, res) => {
    try {
        const { title, author } = req.body;
        if (!title || !author || !req.file) {
            return res.status(400).json({ success: false, message: 'Please fill all required fields and upload an image' });
        }

        const image = `/uploads/${req.file.filename}`;
        const comment = await Comment.create({ title, image, author });
        res.status(201).json({ success: true, message: 'Comment created successfully', comment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Comment by ID
export const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
        res.status(200).json({ success: true, comment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update Comment
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const comment = await Comment.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
        res.status(200).json({ success: true, message: 'Comment updated successfully', comment });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Delete Comment
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
        res.status(200).json({ success: true, message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};