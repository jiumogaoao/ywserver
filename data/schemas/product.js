var mongoose = require('mongoose');
var MemberSchema = new mongoose.Schema({
		"id":String,/*id*/
		"title":String,/*标题*/
		"image":Array,/*图片*/
		"model":{},/*型号id:{id:"",name:"",icon:"",price:0,count:0}*/
		"stratTime":Number,/*上架时间*/
		"endTime":Number,/*下架时间*/
		"dsc":String,//简介
		"object":String,/*项目*/
		"type":String,/*项目类型*/
		"place":String,/*地点*/
		"detail":Array,/*详情*/
		"member":Array,
		"shopId":String,/*商户Id*/
		"start":Number/*好评数*/
	})
module.exports = MemberSchema;