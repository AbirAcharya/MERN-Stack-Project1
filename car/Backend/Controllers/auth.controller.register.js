/**
 * controllers/auth.controller.js
 * Controller handles authentication logic including registration validation, 
 * password hashing, and user persistence based on the schema in Canvas.
 */

const bcrypt = require('bcryptjs');
const User = require("../src/db/userModel"); // Import the User model for database operations

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // 1. Basic validation check for required fields
    if (!name || !email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide name, email, and password.' 
      });
    }

    // 2. Enforce minimum password length validation as specified in the Canvas schema
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    // 3. Normalize email input to lowercase and trim spaces
    const normalizedEmail = email.toLowerCase().trim();

    // 4. Check if the user already exists in the database
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'An account with this email address already exists.' 
      });
    }

    // 5. Generate secure salt and hash the plaintext password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create and persist the user to MongoDB using the schema fields
    const newUser = new User({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    await newUser.save();

    // 7. Send success payload back to client (excluding sensitive credentials)
    res.status(201).json({
      success: true,
      message: 'Registration completed successfully.',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt
      }
    });

  } catch (error) {
    console.error(`[Register Error] ${error.message}`);
    
    // Gracefully handle schema-level validation errors thrown by Mongoose
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ 
        success: false, 
        message: messages[0] || 'Validation failed' 
      });
    }

    res.status(500).json({ 
      success: false, 
      message: 'Server error encountered during user registration.' 
    });
  }
};

module.exports = {
  register
};