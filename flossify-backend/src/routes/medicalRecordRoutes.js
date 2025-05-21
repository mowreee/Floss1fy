import express from 'express';
import MedicalRecord from '../models/medicalRecord.js';

const router = express.Router();

// Get all medical records
router.get('/', async (req, res) => {
    try {
        const records = await MedicalRecord.find().sort({ date: -1 });
        res.json(records);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new medical record
router.post('/', async (req, res) => {
    try {
        const record = new MedicalRecord(req.body);
        const saved = await record.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;