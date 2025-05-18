import Appointment from '../models/Appointment.js';

export const getAppointments = async (req, res) => {
    const filter = req.session.user.role === 'patient'
        ? { patientId: req.session.user.id }
        : {};

    try {
        const appointments = await Appointment.find(filter).populate('patientId');
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
