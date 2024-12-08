const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact.controller'); // Adjust path as needed
const authenticateToken = require('../middleware/authMiddleware')
const upload = require('../middleware/upload'); // Import multer upload middleware

// Route for user registration
router.post('/addcontact',authenticateToken,upload.single('contactPicture'), contactController.addContact);

// Route for user login
router.get('/getcontact/:id',authenticateToken, contactController.getContact);



// Route to get user by ID
router.get('/getcontacts', authenticateToken, contactController.getContacts);

//
router.put('/:id', authenticateToken,upload.single('contactPicture'), contactController.updateContact);
router.delete('/:id', authenticateToken, contactController.deleteContact);

module.exports = router;