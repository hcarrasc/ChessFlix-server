import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    password: String,
    lastLogin: String,
    device: String,
    name: String,
    status: String
});

const userModel = mongoose.model('users', userSchema);

export default userModel;