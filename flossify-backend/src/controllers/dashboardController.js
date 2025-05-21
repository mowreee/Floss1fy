import Appointment from '../models/appointment.js';
import MedicalRecord from '../models/medicalRecord.js';
import Transaction from '../models/transaction.js';

export const getDashboardData = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: -1 });
        const medicalRecords = await MedicalRecord.find().sort({ date: -1 });
        const transactions = await Transaction.find().sort({ date: -1 });

        res.json({
            appointments,
            medicalRecords,
            transactions
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};