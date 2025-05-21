import mongoose from 'mongoose';

const medicalRecordSchema = new mongoose.Schema({
    type: String,
    date: String // ISO date string
});

export default mongoose.model('MedicalRecord', medicalRecordSchema);