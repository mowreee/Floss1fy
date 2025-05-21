import express from 'express';
import Appointment from '../models/appointment.js';
import MedicalRecord from '../models/medicalRecord.js';

const router = express.Router();

// Get all appointments
router.get('/', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: -1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new appointment
router.post('/', async (req, res) => {
    try {
        const appointment = new Appointment(req.body);
        const saved = await appointment.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update appointment status and create medical record if confirmed/cancelled
router.patch('/:id', async (req, res) => {
    try {
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid appointment ID' });
        }
        const updated = await Appointment.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Appointment not found' });

        // Only create a medical record if status is Confirmed or Cancelled
        if (['Confirmed', 'Cancelled'].includes(req.body.status)) {
            // Prevent duplicate medical records for the same appointment
            const exists = await MedicalRecord.findOne({
                patient: updated.patient,
                dentist: updated.dentist,
                date: updated.date,
                treatment: updated.purpose,
            });
            if (!exists) {
                await MedicalRecord.create({
                    patient: updated.patient,
                    dentist: updated.dentist,
                    date: updated.date,
                    treatment: updated.purpose,
                });
            }
        }

        res.json(updated);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;