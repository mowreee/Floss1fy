import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    patient: String, // Patient's name or ID
    dentist: String,
    date: String,
    treatment: String
});

export default mongoose.model('MedicalRecord', medicalRecordSchema);