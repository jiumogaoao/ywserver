var mongoose = require('mongoose');
var MemberSchema = new mongoose.Schema({
		"id":String,
		"name":String
	})
module.exports = MemberSchema;