import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    birthdate: Date
});

export default mongoose.model('Patient', patientSchema);
