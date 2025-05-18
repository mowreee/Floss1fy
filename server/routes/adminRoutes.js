import express from 'express';
import { getAllPatients } from '../controllers/adminController.js';
const router = express.Router();

router.get('/patients', getAllPatients);

export default router;
