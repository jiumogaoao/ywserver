var mongoose = require('mongoose');
var MemberSchema = new mongoose.Schema({
		"id":String,/*id*/
		"title":String,/*标题*/
		"image":Array,/*图片*/
		"copy":Number,/*份数*/
		"price":Number,/*单价*/
		"payedCount":Number,/*已众筹笔数*/
		"payedMoney":Number,/*已众筹金额*/
		"payedMember":Number,/*已众筹人数*/
		"maxTime":Number,/*持有期限*/
		"tax":Number,/*税费预算*/
		"stratTime":Number,/*开始时间*/
		"yearReturn":Number,/*年收益率*/
		"more":Number,/*增值*/
		"dsc":String,//简介
		"change":Number,//债权转移费用
		"invite":String,/*介绍人*/
		"inviteMoney":String,/*介绍费*/
		"object":String,/*项目*/
		"type":String,/*项目类型*/
		"tag":String,/*标签*/
		"orderTime":Number,/*预约时间*/
		"passNumber":Number,/*通过份数*/
		"place":String,/*地点*/
		"buildtype":String,/*建筑类型*/
		"buildState":String,/*建筑状态*/
		"detail":Array,/*详情*/
		"canChange":String,/*是否可转让*/
		"com":Array,
		"member":Array
	})
module.exports = MemberSchema;