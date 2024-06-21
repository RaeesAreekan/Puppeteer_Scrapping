const mongoose = require("mongoose");

// Schema
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    level: { type: String },
    keywords: { type: [String] }, // Specify that it's an array of strings
    detailedAnswer: { type: String }
}, {
    timestamps: true
});

// Model
const Question = mongoose.model('Question', questionSchema); // Capitalize model name for convention
const Java_Questions = mongoose.model('Java_Questions', questionSchema)
const CPP_Questions = mongoose.model('CPP_Questions', questionSchema)
const Networking_Questions = mongoose.model('Networking_Questions', questionSchema)
const Python_Questions = mongoose.model('Python_Questions', questionSchema)
module.exports = {Question,Java_Questions,CPP_Questions,Networking_Questions,Python_Questions};
