const express = require('express');
const router = express.Router();
const { addActivity, getActivities } = require('../controllers/activity.controller');
const authenticateToken = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// Route to add a new activity
router.post('/add', authenticateToken, addActivity);


router.get('/', authenticateToken, getActivities);

module.exports = router;
