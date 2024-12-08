const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ success: false, message: 'Invalid token.' });
        }

        // Log the user object to ensure it contains userId
        console.log('Decoded User from Token:', user);

        req.user = user; // Attach the decoded user to the request object
        next();
    });
};

module.exports = authenticateToken;
