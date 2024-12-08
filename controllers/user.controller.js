const UserService = require('../utils/userService'); // Adjust path as needed
const jwt = require('jsonwebtoken');




const registerUser = async(req, res) => {
    try {
        const user = await UserService.registerUser(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (err) {
        console.error('Error during registration:', err.message);
        res.status(500).json({
            success: false,
            message: 'Registration failed.',
            error: err.message
        });
    }
};


// Login Controller
const loginUser = async (req, res) => {
    try {
        // Call the UserService to handle login logic (e.g., check email, password)
        const userResponse = await UserService.loginUser({
            email: req.body.email,
            password: req.body.password
        });

        if (!userResponse.success) {
            return res.status(userResponse.status).json({
                success: false,
                message: userResponse.message
            });
        }

        // Extract user details from the service response
        const user = userResponse.data.user;

        // Generate JWT token
        const token = generateToken(user);

        // Return the token and user information in the response
        res.status(200).json({
            success: true,
            token: token, // Send the token to the client
            user: user    // Include user details if needed
        });

    } catch (err) {
        console.error('Error during login:', err.message);
        res.status(500).json({
            success: false,
            message: 'Login failed.',
            error: err.message
        });
    }
};

// JWT Token Generation Function
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email }, // Payload with user ID and email
        process.env.JWT_SECRET,                  // Secret from .env file
        { expiresIn: '1h' }                      // Token expiration time
    );
};



const getUserById = async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await UserService.getUserById(userId);
        res.status(200).json({
            success: true,
            data: user.data
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({
            success: false,
            message: 'user not found.'
        });
    }
};


const logoutUser = async(req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(400).json({
                success: false,
                message: 'Token required for logout.'
            });
        }

        // Extract token from Authorization header
        const token = authHeader.split(' ')[1];

        // Call UserService to handle logout
        const result = await UserService.logoutUser(token);

        res.status(result.status).json({
            success: result.success,
            message: result.message
        });
    } catch (err) {
        console.error('Error during logout:', err.message);
        res.status(500).json({
            success: false,
            message: 'Logout failed.',
            error: err.message
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getUserById,
    logoutUser
};