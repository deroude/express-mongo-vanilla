import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'basic', enum: ['basic', 'admin'] },
    status: { type: String, default: 'new', enum: ['new', 'active', 'blocked'] }
}, {
        timestamps: true
    });

export const User = mongoose.model('User', UserSchema);