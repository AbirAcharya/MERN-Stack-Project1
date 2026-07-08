const bcrypt = require('bcryptjs');
const User = require("../src/db/userModel");

/**
 * @desc    Login existing user (JWT Excluded)
 * @route   POST /api/auth/login
 */
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Basic validation check
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide both email and password.' 
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Look for the user document in MongoDB
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials entered.' 
      });
    }

    // 3. Compare the entered password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid credentials entered.' 
      });
    }

    // 4. Return success status with basic user data only (No JWT)
    res.status(200).json({
      success: true,
      message: 'Login successful.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error(`[Login Error] ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error encountered during user login.' 
    });
  }
};

module.exports = { login };