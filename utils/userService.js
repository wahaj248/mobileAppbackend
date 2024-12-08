const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

class UserService {
    async registerUser({
        username,
        email,
        password
    }) {
        try {
            const existingUser = await User.findOne({
                email
            });
            if (existingUser) {
                return {
                    status: 409,
                    success: false,
                    message: 'Email already in use.'
                }; // 409 Conflict
            }

            const user = new User({
                username,
                email,
                password
            });
            await user.save();

            return {
                status: 201,
                success: true,
                data: user,
                message: 'User registered successfully.'
            }; // 201 Created
        } catch (error) {
            console.error('Error in registerUser:', error);
            return {
                status: 500,
                success: false,
                message: 'Registration failed.'
            }; // 500 Internal Server Error
        }
    }

    async loginUser({
        email,
        password
    }) {
        try {
            const user = await User.findOne({
                email
            });
            if (!user) {
                return {
                    status: 404,
                    success: false,
                    message: 'User not found.'
                };
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return {
                    status: 401,
                    success: false,
                    message: 'Invalid credentials.'
                };
            }

            const token = jwt.sign({
                userId: user._id
            }, process.env.JWT_SECRET, {
                expiresIn: '1h'
            });

            return {
                status: 200,
                success: true,
                data: {
                    token,
                    user
                },
                message: 'Login successful.'
            };
        } catch (error) {
            console.error('Error in loginUser:', error);
            return {
                status: 500,
                success: false,
                message: 'Login failed.'
            };
        }
    }



    async getUserById(id) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return {
                status: 400,
                success: false,
                message: 'Invalid User ID'
            }; // 400 Bad Request
        }

        try {
            const user = await User.findById(id);
            if (!user) {
                return {
                    status: 404,
                    success: false,
                    message: 'User not found'
                }; // 404 Not Found
            }
            return {
                status: 200,
                success: true,
                data: user
            }; // 200 OK
        } catch (error) {
            console.error('Error in getUserById:', error);
            return {
                status: 500,
                success: false,
                message: 'Failed to retrieve user'
            }; // 500 Internal Server Error
        }
    }


    async logoutUser(token) {
        try {
            // If you are using server-side token blacklisting, add the token to the blacklist here.
            // For simplicity, this example assumes client-side handling of token removal.

            // Example for server-side blacklisting (if implemented):
            // blacklistedTokens.add(token);

            return {
                status: 200,
                success: true,
                message: 'Logout successful.'
            }; // 200 OK
        } catch (error) {
            console.error('Error in logoutUser:', error);
            return {
                status: 500,
                success: false,
                message: 'Logout failed.'
            }; // 500 Internal Server Error
        }
    }

}

module.exports = new UserService();