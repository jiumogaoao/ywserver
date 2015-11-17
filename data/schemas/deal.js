var mongoose = require('mongoose');
var MemberSchema = new mongoose.Schema({
		"id":String,/*id*/
		"productId":String,/*商品id*/
		"userId":String,/*用户id*/
		"startTime":Number,/*购买时间*/
		"endTime":Number,/*退出时间*/
		"buyPrice":Number,/*买入价*/
		"sellPrice":Number,/*卖出价*/
		"count":Number,/*数量*/
		"name":String,/*用户名*/
		"phone":String/*用户手机号*/
	})
module.exports = MemberSchema;