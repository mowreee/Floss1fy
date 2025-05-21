import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await User.find({ role: 'patient' });
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;