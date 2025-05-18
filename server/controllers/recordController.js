import Record from '../models/Record.js';

export const getRecords = async (req, res) => {
    const filter = req.session.user.role === 'patient'
        ? { patientId: req.session.user.id }
        : {};

    try {
        const records = await Record.find(filter).populate('patientId');
        res.json(records);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
