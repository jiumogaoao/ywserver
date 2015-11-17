var mongoose = require('mongoose');
var memberSchema = require('../schemas/idName');
var member = mongoose.model('obj',memberSchema);
module.exports = member;