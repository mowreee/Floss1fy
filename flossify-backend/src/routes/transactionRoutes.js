import express from 'express';
import Transaction from '../models/transaction.js';

const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});

// Add a new transaction
router.post('/', async (req, res) => {
    const { patient, purpose, amount, date, status } = req.body;
    const transaction = new Transaction({ patient, purpose, amount, date, status });
    await transaction.save();
    res.status(201).json(transaction);
});

// Confirm a transaction
router.put('/:id/confirm', async (req, res) => {
    const updated = await Transaction.findByIdAndUpdate(
        req.params.id,
        { status: "Paid" },
        { new: true }
    );
    res.json(updated);
});

export default router;