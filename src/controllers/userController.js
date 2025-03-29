import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const otpStore = {};

// ✅ Send OTP for verification
export const sendOtp = async (req, res) => {
    try {
        const { mobile } = req.body;
        if (!mobile || mobile.length !== 10) {
            return res.status(400).json({ success: false, message: 'Valid mobile number is required' });
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        otpStore[mobile] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 };

        const data = {
            otp,
            type: 'SMS',
            numberOrMail: mobile,
        };

        const apiKey = process.env.OTP_API_KEY; // Replace with your actual API key;
        const apiSalt = process.env.OTP_SALT; // Replace with your actual API salt;
        console.log(apiKey, apiSalt, data)
        const response = await axios.post('https://api.codemindstudio.com/api/start_verification', data, {
            headers: {
                'api-key': apiKey,
                'api-salt': apiSalt,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        console.log(response.data)
        res.status(200).json({ success: response.data.status, message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Verify OTP
export const verifyOtp = async (req, res) => {
    try {
        const { mobile, otp } = req.body;

        if (!mobile || !otp) {
            return res.status(400).json({ success: false, message: 'Mobile and OTP are required' });
        }

        if (!otpStore[mobile] || otpStore[mobile].otp !== Number(otp) || otpStore[mobile].expiresAt < Date.now()) {
            return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
        }

        delete otpStore[mobile];

        res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Create User
export const createUser = async (req, res) => {
    try {
        const { name, mobile, password } = req.body;

        if (!name || !mobile || !password) {
            return res.status(400).json({ success: false, message: 'Name, Mobile, and Password are required' });
        }

        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Mobile number already exists' });
        }

        const userCount = await User.countDocuments();
        const role = userCount === 0 ? 'admin' : 'user';

        const user = await User.create({ name, mobile, password, role });
        res.status(201).json({ success: true, message: 'User created successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        console.log(error)
    }
};


// ✅ Login
export const loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const { mobile, password } = req.body;

        if (!mobile || !password) {
            return res.status(400).json({ success: false, message: 'Mobile number and password are required' });
        }

        const user = await User.findOne({ mobile });
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
                mobile: user.mobile,
                role: user.role,
                address: user.address,
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
        if (!address && !phone) {
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