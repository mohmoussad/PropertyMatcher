const PropertyRequest = require('../models/PropertyRequest');

exports.createRequest = async (req, res) => {
  const { propertyType, area, price, city, district, description } = req.body;
  const propertyRequest = new PropertyRequest({
    propertyType, area, price, city, district, description, createdBy: req.user._id
  });
  await propertyRequest.save();
  res.status(201).send(propertyRequest);
};

exports.updateRequest = async (req, res) => {
  const { description, area, price } = req.body;
  const propertyRequest = await PropertyRequest.findById(req.params.id);
  if (!propertyRequest || propertyRequest.createdBy.toString() !== req.user._id.toString()) {
    return res.status(404).send({ error: 'Request not found or unauthorized' });
  }
  propertyRequest.description = description || propertyRequest.description;
  propertyRequest.area = area || propertyRequest.area;
  propertyRequest.price = price || propertyRequest.price;
  await propertyRequest.save();
  res.send(propertyRequest);
};
