const { fileHost } = require('../config');

exports.formatImageUrl = (path, name) => `${fileHost}${path}${name}`;
