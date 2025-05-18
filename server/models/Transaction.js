import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
    amount: Number,
    date: Date,
    status: String
});

export default mongoose.model('Transaction', transactionSchema);
