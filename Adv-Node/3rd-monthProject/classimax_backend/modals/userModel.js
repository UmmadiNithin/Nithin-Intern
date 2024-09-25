const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  image: {
    type: Buffer, 
    required: false,
  },
  community_name: {
    type: String,
    required: false,
  },
  zipCode: {
    type: Number, 
    required: false,
  },
  phone_No: {
    type: Number, 
    required: false,
  },
  address: {
    type: String,
    required: false,
  },

  created_at: {
    type: Date,
    default: Date.now, 
  },
  updated_at: {
    type: Date,
    default: Date.now, 
  },
  Created_By: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false,
  },
  updated_By: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: false,
  },
});


userSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});
module.exports = mongoose.model('User', userSchema);