const Ad = require('../models/Ad');
const PropertyRequest = require('../models/PropertyRequest');

exports.createAd = async (req, res) => {
  const { propertyType, area, price, city, district, description } = req.body;

  const ad = new Ad({ propertyType, area, price, city, district, description, createdBy: req.user._id });
  await ad.save();
  res.status(201).send(ad);
};

exports.matchRequests = async (req, res) => {
  const ad = await Ad.findById(req.params.id);
  if (!ad) {
    return res.status(404).send({ error: 'Ad not found' });
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const priceTolerance = 0.1;
  const minPrice = ad.price * (1 - priceTolerance);
  const maxPrice = ad.price * (1 + priceTolerance);

  const matches = await PropertyRequest.aggregate([
    {
      $match: {
        district: ad.district,
        area: ad.area,
        price: { $gte: minPrice, $lte: maxPrice }
      }
    },
    { $sort: { refreshedAt: -1 } },
    {
      $facet: {
        data: [{ $skip: (page - 1) * limit }, { $limit: limit }],
        total: [{ $count: 'total' }]
      }
    }
  ]);

  res.send(matches);
};

