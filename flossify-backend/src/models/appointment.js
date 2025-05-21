import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    dentist: String,
    date: String, // ISO date string
    time: String,
    status: String
});

export default mongoose.model('Appointment', appointmentSchema);