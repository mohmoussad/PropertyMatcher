const mongoose = require('mongoose');
const { Schema } = mongoose;

const adSchema = new Schema({
  propertyType: { type: String, enum: ['VILLA', 'HOUSE', 'LAND', 'APARTMENT'], required: true },
  area: { type: Number, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  description: { type: String, required: true },
  refreshedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;
