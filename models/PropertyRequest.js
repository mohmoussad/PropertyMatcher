const mongoose = require('mongoose');
const { Schema } = mongoose;

const propertyRequestSchema = new Schema({
  propertyType: { type: String, enum: ['VILLA', 'HOUSE', 'LAND', 'APARTMENT'], required: true },
  area: { type: Number, required: true },
  price: { type: Number, required: true },
  city: { type: String, required: true },
  district: { type: String, required: true },
  description: { type: String, required: true },
  refreshedAt: { type: Date, default: Date.now },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

propertyRequestSchema.index({ district: 1, area: 1, price: 1});

const PropertyRequest = mongoose.model('PropertyRequest', propertyRequestSchema);
module.exports = PropertyRequest;
