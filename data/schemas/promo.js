var mongoose = require('mongoose');
var MemberSchema = new mongoose.Schema({
		"id":String,/*id*/
		"name":String,/*名字*/
		"image":String,/*头像*/
		"link":String/*描述*/
	})
module.exports = MemberSchema;