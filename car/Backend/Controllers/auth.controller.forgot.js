const User = require("../src/db/userModel");

/**
 * @desc    Forgot Password - Generate and return a simple reset code
 * @route   POST /api/auth/forgot-password
 */
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Basic input validation
    if (!email) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide your account email address.' 
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // 2. Check if the user profile exists in MongoDB
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(444).json({ 
        success: false, 
        message: 'No account found with this email address.' 
      });
    }

    // 3. Generate a plain 6-digit code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();

    // 4. Log it clearly in your Node backend console so you can see it instantly
    console.log("==========================================");
    console.log(`[RESET CODE GENERATED] For Email: ${normalizedEmail}`);
    console.log(`YOUR 6-DIGIT CODE IS: ${resetCode}`);
    console.log("==========================================");

    // 5. Send success back to the frontend alongside the code for easy local testing
    res.status(200).json({
      success: true,
      message: 'Reset code generated successfully.',
      code: resetCode // Passed back safely so your frontend can read it without email servers
    });

  } catch (error) {
    console.error(`[Forgot Password Error] ${error.message}`);
    res.status(500).json({ 
      success: false, 
      message: 'Server error tracking password recovery request.' 
    });
  }
};

module.exports = { forgotPassword };