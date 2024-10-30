const express = require('express');
const { getRouteData } = require('../controllers/routeDataController');
const router = express.Router();

router.get('/', getRouteData);

module.exports = router;
