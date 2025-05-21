import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    patient: String,
    purpose: String,
    amount: Number,
    date: String,
    status: String,
});
export default mongoose.model("Transaction", transactionSchema);