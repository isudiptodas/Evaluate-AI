import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String}
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);