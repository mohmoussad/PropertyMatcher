const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['ADMIN', 'CLIENT', 'AGENT'], required: true },
  status: { type: String, enum: ['ACTIVE', 'DELETED'], default: 'ACTIVE' }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
