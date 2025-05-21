import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Appointment from './src/models/appointment.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/flossify';

async function addPurpose() {
    await mongoose.connect(MONGODB_URI);

    const result = await Appointment.updateMany(
        { purpose: { $exists: false } },
        { $set: { purpose: 'Consultation' } } // You can change the default value
    );

    console.log(`Updated ${result.modifiedCount} appointments.`);
    await mongoose.disconnect();
}

addPurpose().catch(err => {
    console.error(err);
    process.exit(1);
});