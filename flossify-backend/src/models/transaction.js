import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    amount: Number,
    date: String // ISO date string
});

export default mongoose.model('Transaction', transactionSchema);