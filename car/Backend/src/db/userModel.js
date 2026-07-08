/**
 * models/User.js
 * Defines the Mongoose database schema and ruleset for the User collection.
 */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please provide your full name'] 
  },
  email: { 
    type: String, 
    required: [true, 'Please provide an email address'], 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  password: { 
    type: String, 
    required: [true, 'Please provide a security password'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  verificationCode: { 
    type: String, 
    default: null 
  },
  codeExpiry: { 
    type: Date, 
    default: null 
  }
}, { 
  timestamps: true // Auto-generates createdAt and updatedAt fields
});
const userModel = mongoose.model('User', UserSchema);
module.exports=userModel