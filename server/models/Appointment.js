import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    date: Date,
    time: String,
    reason: String,
    status: String
});

export default mongoose.model('Appointment', appointmentSchema);
