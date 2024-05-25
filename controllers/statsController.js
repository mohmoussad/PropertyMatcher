const User = require('../models/User');

exports.getStats = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const stats = await User.aggregate([
    {
      $lookup: {
        from: 'ads',
        localField: '_id',
        foreignField: 'createdBy',
        as: 'ads'
      }
    },
    {
      $lookup: {
        from: 'propertyrequests',
        localField: '_id',
        foreignField: 'createdBy',
        as: 'requests'
      }
    },
    {
      $project: {
        name: 1,
        role: 1,
        adsCount: { $size: '$ads' },
        totalAdsAmount: { $sum: '$ads.price' },
        requestsCount: { $size: '$requests' },
        totalRequestsAmount: { $sum: '$requests.price' }
      }
    },
    { $skip: (page - 1) * limit },
    { $limit: limit },
    {
      $facet: {
        data: [],
        total: [{ $count: 'total' }]
      }
    }
  ]);

  const result = stats[0];
  res.send({
    data: result.data,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    total: result.total[0]?.total || 0,
    hasNextPage: (page * limit) < (result.total[0]?.total || 0),
    hasPreviousPage: page > 1
  });
};
