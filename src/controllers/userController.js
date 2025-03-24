import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import sgMail from '@sendgrid/mail';
import { JWT_SECRET } from '../config/env.js';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || "skakak");
const otpStore = {};

// ✅ Send OTP for verification
export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: 'Email is required' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        otpStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

        const msg = {
            to: email,
            from: 'your-email@example.com',
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}. It is valid for 10 minutes.`
        };

        await sgMail.send(msg);
        res.status(200).json({ success: true, message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Verify OTP and Create User
export const createUser = async (req, res) => {
    try {
        const { name, email, password, otp } = req.body;

        if (!name || !email || !password || !otp) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        if (!otpStore[email] || otpStore[email].otp !== Number(otp) || otpStore[email].expiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        delete otpStore[email];

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }

        const userCount = await User.countDocuments();
        const role = userCount === 0 ? 'admin' : 'user';

        const user = await User.create({ name, email, password, role });
        res.status(201).json({ success: true, message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Login
export const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (password !== user.password) {
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// ✅ Get User by ID
export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Update User (PATCH)
export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Prevent updating email and password directly for security reasons
        if (updateData.email || updateData.password) {
            return res.status(400).json({ success: false, message: 'Cannot update email or password using this endpoint' });
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
        if (!user) return res.status(404).json({ success: false, message: 'User not found' });

        res.status(200).json({ success: true, message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Users
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find(); // Use "users" instead of "user" for multiple records
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: 'No users found' });
        }
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateUserProfile = async (req, res) => {
    const { id } = req.params;
    const { address, phone, email } = req.body;

    try {
        // Validate input
        if (!address && !phone && !email) {
            return res.status(400).json({ message: 'Provide at least one field to update' });
        }

        // Find and update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: { ...(address && { address }), ...(phone && { phone }), ...(email && { email }) } },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};