import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
   try {
      const { username, lastname, firstname, middlename, email, password, role } = req.body;
      const existing = await User.findOne({ $or: [{ email }, { username }] });
      if (existing) return res.status(400).json({ message: 'User already exists' });

      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ username, lastname, firstname, middlename, email, password: hashed, role });
      await user.save();
      res.status(201).json({ message: 'User registered' });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};

export const login = async (req, res) => {
   try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });

      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(400).json({ message: 'Invalid credentials' });

      // For demo: return user info (in production, use JWT)
      res.json({ id: user._id, username: user.username, role: user.role });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
};