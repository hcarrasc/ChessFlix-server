import mongoose from '../database.js';

const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    lastLogin: String,
    device: String,
    name: String,
    state: String
});

const userModel = mongoose.model('users', userSchema);

export default userModel;