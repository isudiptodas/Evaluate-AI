import mongoose, { Schema } from "mongoose";

const historySchema = new mongoose.Schema({
    name: {type: String},
    role: {type: String},
    company: {type: String},
    experience: {type: String},
    type: {type: String},
    feedback: {type: String},
    questions: {type: String},
    userId: { type: String}
}, {timestamps: true});

export const History = mongoose.models.History || mongoose.model("History", historySchema);