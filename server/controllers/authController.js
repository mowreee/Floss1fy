import Admin from '../models/Admin.js';
import Patient from '../models/Patient.js';

export const login = async (req, res) => {
    const { email, password, role } = req.body;
    const Model = role === 'admin' ? Admin : Patient;

    try {
        const user = await Model.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.session.user = { id: user._id, role };
        res.json({ message: 'Login successful', user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
};
