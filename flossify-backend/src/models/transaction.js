import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    patient: String, // Patient name or ID
    amount: Number,
    date: String, // ISO date string
    status: { type: String, default: 'Pending' } // Paid/Pending
});

export default mongoose.model('Transaction', transactionSchema);