const routeData = require('../data/routeData.json');

exports.getRouteData = (req, res) => {
  res.json(routeData);
};
