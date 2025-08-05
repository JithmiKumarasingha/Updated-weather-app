const NodeCache = require('node-cache');

// Cache for 5 minutes (300 seconds)
const cache = new NodeCache({ stdTTL: 300 });

module.exports = cache;