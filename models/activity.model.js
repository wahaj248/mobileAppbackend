const mongoose = require('mongoose');

const weeklyActivitySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        // required: true,
    },
    day: {
        type: String,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        required: true,
    },
    activityType: {
        type: String,
        required: true,
        trim: true,
    },
    duration: {
        type: Number, // duration in minutes
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},{ timestamps: true });

module.exports = mongoose.model('WeeklyActivity', weeklyActivitySchema);
