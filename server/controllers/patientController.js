import Patient from '../models/Patient.js';

export const getProfile = async (req, res) => {
    try {
        const patient = await Patient.findById(req.session.user.id);
        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
