import Transaction from '../models/Transaction.js';

export const getTransactions = async (req, res) => {
    const filter = req.session.user.role === 'patient'
        ? { patientId: req.session.user.id }
        : {};

    try {
        const transactions = await Transaction.find(filter).populate('patientId');
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
