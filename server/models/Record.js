import mongoose from 'mongoose';

const recordSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    diagnosis: String,
    treatment: String,
    date: Date
});

export default mongoose.model('Record', recordSchema);
