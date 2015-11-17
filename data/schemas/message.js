var mongoose = require('mongoose');
var MemberSchema = new mongoose.Schema({
		"id":String,/*id*/
		"title":String,/*标题*/
		"message":String,/*内容*/
		"start":Number,/*生效时间*/
		"end":Number,/*结束时间*/
		"userId":String/*用户Id*/
	})
module.exports = MemberSchema;