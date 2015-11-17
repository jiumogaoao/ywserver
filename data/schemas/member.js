var mongoose = require('mongoose');
var MemberSchema = new mongoose.Schema({
		"id":String,/*id*/
		"type":Number,/*类型,1普通用户2管理用户*/
		"userName":String,/*用户名*/
		"image":String,/*头像*/
		"phone":String,/*手机*/
		"email":String,/*邮箱*/
		"dsc":String,/*简介*/
		"introducer":String,/*介绍人*/
		"lastTime":Number,/*上次登录时间*/
		"lastIp":String,/*上次登录IP*/
		"time":Number,/*当前登录时间*/
		"ip":String,/*当前登录ip*/
		"balance":Number,
		"redpacket":Number
	})
module.exports = MemberSchema;