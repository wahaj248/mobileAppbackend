const WeeklyActivity = require('../models/activity.model');

// Add new activity
exports.addActivity = async (req, res) => {
    try {
        // Log the req.user object to see if it contains the userId
        console.log('User from JWT:', req.user);

        const userId = req.user.userId; // Ensure you're using `userId` as set in the JWT payload

        const { day, activityType, duration } = req.body;

        // Create a new activity with the userId
        const activity = new WeeklyActivity({
            userId, // Associate the activity with the logged-in user
            day,
            activityType,
            duration
        });

        // Save to the database
        await activity.save();

        return res.status(201).json({
            message: 'Activity added successfully',
            data: activity
        });
    } catch (error) {
        console.error('Error during activity creation:', error); // Log the actual error
        return res.status(500).json({
            error: 'Failed to add activity',
            details: error.message
        });
    }
};
// Get all activities for a user
exports.getActivities = async (req, res) => {
    try {
        // Log req.user to check if it contains the userId
        console.log('User from JWT:', req.user);

        const activities = await WeeklyActivity.find({ userId: req.user.userId }); // Use userId from JWT
        
        if (activities.length === 0) {
            return res.status(404).json({
                message: 'No activities found for this user.',
                data: []
            });
        }

        res.status(200).json({
            message: 'Activities retrieved successfully',
            data: activities,
        });
    } catch (error) {
        console.error('Error retrieving activities:', error); // Log the error
        res.status(400).json({
            error: 'Failed to retrieve activities',
            details: error.message,
        });
    }
};
