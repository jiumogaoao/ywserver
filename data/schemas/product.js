var mongoose = require('mongoose');
var MemberSchema = new mongoose.Schema({
		"id":String,/*id*/
		"title":String,/*商品名*/
		"image":Array,/*图片*/
		"brand":String,/*品牌*/
		"stratTime":Number,/*上架时间*/
		"endTime":Number,/*下架时间*/
		"dsc":String,//简介
		"goodState":Array,//商品属性
		"object":String,/*栏目*/
		"type":String,/*栏目类型*/
		"tage":Array,/*标签*/
		"place":String,/*发货地*/
		"detail":Array,/*详情*/
		"priceState":Array,/*自定义属性[[{id:"",name:"",icon:""}]]*/
		"model":{},/*型号id:{price:0,count:0,state:[0,1]}*/
		"member":Array,
		"shopId":String,/*商户Id*/
		"start":Number/*好评数*/
	})
module.exports = MemberSchema;