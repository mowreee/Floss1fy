import express from 'express';
import { register, login } from '../controllers/userController.js';
import User from '../models/user.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// GET /api/profile?username=USERNAME
router.get('/profile', async (req, res) => {
   const { username } = req.query;
   try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({
         username: user.username,
         lastname: user.lastname,
         firstname: user.firstname,
         middlename: user.middlename,
         email: user.email,
         role: user.role,
      });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

// PUT /api/profile
router.put('/profile', async (req, res) => {
   const { username, lastname, firstname, middlename, email } = req.body;
   try {
      const user = await User.findOne({ username });
      if (!user) return res.status(404).json({ message: 'User not found' });

      user.lastname = lastname;
      user.firstname = firstname;
      user.middlename = middlename;
      user.email = email;
      await user.save();

      res.json({
         username: user.username,
         lastname: user.lastname,
         firstname: user.firstname,
         middlename: user.middlename,
         email: user.email,
         role: user.role,
      });
   } catch (err) {
      res.status(500).json({ message: err.message });
   }
});

export default router;