import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patient: String, // <-- Add this line if not present
    dentist: String,
    date: String,
    time: String,
    status: String,
    purpose: String
});

export default mongoose.model('Appointment', appointmentSchema);