import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   lastname: { type: String, required: true },
   firstname: { type: String, required: true },
   middlename: { type: String },
   email: { type: String, required: true, unique: true },
   password: { type: String, required: true },
   role: { type: String, enum: ['admin', 'patient'], default: 'patient' }
});

export default mongoose.model('User', userSchema);