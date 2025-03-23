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

