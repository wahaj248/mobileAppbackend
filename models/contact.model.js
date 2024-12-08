const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true, // Ensures no duplicate phone numbers
        trim: true
    },
    contactPicture: {
        type: String, // URL or file path for the contact picture
        default: null // Default to null if no picture is provided
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (if you want to associate contacts with users)
        required : true
        
    },
}, { timestamps: true });

module.exports = mongoose.model('Contact', contactSchema);
