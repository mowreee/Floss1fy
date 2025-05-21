import express from 'express';
import Transaction from '../models/transaction.js';

const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find().sort({ date: -1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;