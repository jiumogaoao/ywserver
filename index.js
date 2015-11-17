//var server = require("./server");
//var router = require("./router");
//server.start(router.route);

var app = require('./server')
  , router = require('./router')
   , url = require("url")
   , query = require("querystring")
   global.server = {
   	deal : require('./deal'),
      admin : require('./admin'),
      client : require('./client'),
      product : require('./product'),
      promotion : require('./promotion'),
	  config : require('./config'),
	  obj : require('./obj'),
	  type : require('./type'),
	  com : require('./com'),
	  realName : require('./realName'),
	  cardBind : require('./cardBind')
   }
/**********************************************************************************/
   var dbURL="mongodb://127.0.0.1:27017/xingzhong"
   global.db = require("mongoose").connect(dbURL);
   global.data_mg = {}
      data_mg.admin = require('./data/models/admin');//管理员表
      data_mg.client = require('./data/models/client');//客户表
      data_mg.client_password = require('./data/models/client_password');//密码表
      data_mg.client_product = require('./data/models/client_product');//购买表
      data_mg.product = require('./data/models/product');//商品表
      data_mg.promotion = require('./data/models/promotion');//宣传表
      data_mg.updateTime = require('./data/models/updateTime');//更新表
      data_mg.deal = require('./data/models/deal');//交易表
	  data_mg.bindCode = require('./data/models/bindCode');//验证码表
	  data_mg.config = require('./data/models/config');//配置表
	  data_mg.invite = require('./data/models/invite');//邀请表
	  data_mg.account = require('./data/models/account');//帐户表
	  data_mg.obj = require('./data/models/obj');//项目表
	  data_mg.type = require('./data/models/type');//类型表
	  data_mg.com = require('./data/models/com');//评论表
	  data_mg.realName = require('./data/models/realName');//实名制表
	  data_mg.cardBind = require('./data/models/cardBind');//银行卡表
	  data_mg.redPacket = require('./data/models/redPacket');//红包表
	  data_mg.count = require('./data/models/count');//数据统计表


/***********************************************************************************/
	global.uuid=function(){
		return 'xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	        return (v.toString(16)).toUpperCase();
    	});
	}
/***********************************************************************************/
	global.tokenArry={}; 
/***********************************************************************************/
var showDB=function(){
		data_mg.product.find({},function(err,data){console.log("product")
			console.log(data)
			})
		data_mg.obj.find({},function(err,data){console.log("obj")
			console.log(data)
			})
		data_mg.type.find({},function(err,data){console.log("type")
			console.log(data)
			})
		data_mg.com.find({},function(err,data){console.log("com")
			console.log(data)
			})
		data_mg.realName.find({},function(err,data){console.log("realName")
			console.log(data)
			})
		data_mg.cardBind.find({},function(err,data){console.log("cardBind")
			console.log(data)
			})
		data_mg.updateTime.find({},function(err,data){console.log("updateTime")
			console.log(data)
			})
}
/****************************************************************************************/	 
var initDB=function(){
		var totalCount=0;
		function totalCheck(){
			totalCount++;
			if(totalCount==32){
				showDB();
				}
			}
		var addConfig=new data_mg.config({
		any:{
		footerInfo:{
			titleText:"全国首家专业房地产众筹平台",
			slogan:"人人参与  创新投资",
			mobile:"（021）6181-3682",
			fax:"（021）6181-3682",
			time:"（周一至周五 10:00-18:30）",
			number:"400-661-3350",
	      companyName:"上海中筹互联网金融信息服务有限公司",
		  referredToAs:"",
		  companyUrl:"",
	      cooperationEmail:"biz@cncrowd.com",
		  recruitmentEmail:"biz@cncrowd.com",
		  address:["地址：上海市长宁区延安西路1118号","龙之梦大厦2202室&nbsp;&nbsp;&nbsp;&nbsp;","200052"],
	      copRight:"©2014 CNCrowd",
		  record:" 沪ICP备14044695号-1",
	      nav:[{id:"mode",name:"中筹模式"},{id:"product",name:"我要众筹"},{id:"procedure",name:"众筹步聚"},{id:"FAQS",name:"常见问题"},{id:"about",name:"关于我们"}],
	      conText_0:"为全国首家专业房地产众筹平台",
	      conText_1:"致力于通过互联网金融的创新",
	      conText_2:"推动传统房地产投融资模式的变革和创新"
         },
         earnings:{
           titleText:"高收益从何而来",
           dsc:"高收益来自于对市场的深度判断和有力操控",
           earningsRateTitle:"收益率",
           earningsRate:"15%",
           steps:["开始众筹","风险把控","资产来源","每份100元","众筹获利","增值管理","溢价出售"],
           title_2:"众筹",
           image:"images/slide_01.png"
         },
		 logo:"img/headerLogo.jpg",
		 more:"1",
		 change:"1",
         button:[[{id:"login",name:"登录"},{id:"register",name:"注册"}],[{id:"zone",name:"用户中心"},{id:"out",name:"退出"}],[{id:"out",name:"退出"}]],
         nav:[{id:"mode",name:"众筹模式"},{id:"product",name:"我要众筹"},{id:"procedure",name:"众筹步聚"},{id:"FAQS",name:"常见问题"},{id:"about",name:"关于我们"}]
		}
     })
	 	addConfig.save(
		function(){
			console.log("config init");
			totalCheck();
			}
		)
	 	var configUP=new data_mg.updateTime({"parentKey":"config","childKey":new Date().getTime()})
	    configUP.save(function(){
			console.log("configTime init");
			totalCheck();
			});
		var newTotal=new data_mg.count({
		"name":"totalView",//图片id
		"number":0,//路径
		});
		newTotal.save(function(){
			console.log("Total init");
			totalCheck();
		});
		var addAdmin=new data_mg.client({"id":"001",/*id*/
		"type":2,/*类型,1普通用户2管理用户*/
		"userName":"admin",/*用户名*/
		"image":"",/*头像*/
		"dsc":"",/*简介*/
		"phone":0,/*手机*/
		"email":"",/*邮箱*/
		"introducer":"",/*介绍人*/
		"lastTime":0,/*上次登录时间*/
		"lastIp":"",/*上次登录IP*/
		"time":0,/*当前登录时间*/
		"balance":0,
		"redpacket":0,
		"ip":""/*当前登录ip*/});
		addAdmin.save(function(){
			console.log("addAdmin init");
			totalCheck();
			});
		var adminPass=new data_mg.client_password({"parentKey":"001",
		"childKey":"123456"});
		adminPass.save(function(){
			console.log("adminPass init");
			totalCheck();
			});
		var addPromo0=new data_mg.promotion({"id":"00",
		"name":"首页banner（一）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo0.save(function(){
			console.log("Promo0 init");
			totalCheck();
			});
		var addPromo1=new data_mg.promotion({"id":"01",
		"name":"首页banner（二）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo1.save(function(){
			console.log("Promo1 init");
			totalCheck();
			});
		var addPromo2=new data_mg.promotion({"id":"02",
		"name":"首页banner（三）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo2.save(function(){
			console.log("Promo2 init");
			totalCheck();
			});
		var addPromo3=new data_mg.promotion({"id":"03",
		"name":"首页banner（四）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo3.save(function(){
			console.log("Promo3 init");
			totalCheck();
			});
		var addPromo4=new data_mg.promotion({"id":"04",
		"name":"表格一（一）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo4.save(function(){
			console.log("Promo4 init");
			totalCheck();
			});
		var addPromo5=new data_mg.promotion({"id":"05",
		"name":"表格一（二）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo5.save(function(){
			console.log("Promo5 init");
			totalCheck();
			});
		var addPromo6=new data_mg.promotion({"id":"06",
		"name":"表格一（三）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo6.save(function(){
			console.log("Promo6 init");
			totalCheck();
			});
		var addPromo7=new data_mg.promotion({"id":"07",
		"name":"表格一（四）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo7.save(function(){
			console.log("Promo7 init");
			totalCheck();
			});
		var addPromo8=new data_mg.promotion({"id":"08",
		"name":"表格一（五）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo8.save(function(){
			console.log("Promo8 init");
			totalCheck();
			});
		var addPromo9=new data_mg.promotion({"id":"09",
		"name":"表格二（一）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo9.save(function(){
			console.log("Promo9 init");
			totalCheck();
			});
		var addPromo10=new data_mg.promotion({"id":"10",
		"name":"表格二（二）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo10.save(function(){
			console.log("Promo10 init");
			totalCheck();
			});
		var addPromo11=new data_mg.promotion({"id":"11",
		"name":"表格二（三）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo11.save(function(){
			console.log("Promo11 init");
			totalCheck();
			});
		var addPromo12=new data_mg.promotion({"id":"12",
		"name":"表格二（四）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo12.save(function(){
			console.log("Promo12 init");
			totalCheck();
			});
		var addPromo13=new data_mg.promotion({"id":"13",
		"name":"表格二（五）",
		"image":"img/pic.jpg",
		"link":"http://www.baidu.com"})
		addPromo13.save(function(){
			console.log("Promo13 init");
			totalCheck();
			});
		var addObj0=new data_mg.obj({"id":uuid(),"name":"产权众筹"})
		addObj0.save(function(){
			console.log("Obj0 init");
			totalCheck();
			});
		var addObj1=new data_mg.obj({"id":uuid(),"name":"经营权众筹"})
		addObj1.save(function(){
			console.log("Obj1 init");
			totalCheck();
			});
		var addObj2=new data_mg.obj({"id":uuid(),"name":"众筹建房"})
		addObj2.save(function(){
			console.log("Obj2 init");
			totalCheck();
			});
		var addType0=new data_mg.type({"id":uuid(),"name":"热门地区"})
		addType0.save(function(){
			console.log("type0 init");
			totalCheck();
			});
		var addType1=new data_mg.type({"id":uuid(),"name":"热门城市"})
		addType1.save(function(){
			console.log("type1 init");
			totalCheck();
			});
		var addType2=new data_mg.type({"id":uuid(),"name":"潜力地区"})
		addType2.save(function(){
			console.log("type2 init");
			totalCheck();
			});
		/****************************************************************************/
		var addproductT=new data_mg.updateTime({"parentKey":"product","childKey":0})
		addproductT.save(function(){
			console.log("productTime init");
			totalCheck();
			});
		var addObjT=new data_mg.updateTime({"parentKey":"obj","childKey":new Date().getTime()})
		addObjT.save(function(){
			console.log("objTime init");
			totalCheck();
			});
		var addTypeT=new data_mg.updateTime({"parentKey":"type","childKey":new Date().getTime()})
		addTypeT.save(function(){
			console.log("typeTime init");
			totalCheck();
			});
		var addComT=new data_mg.updateTime({"parentKey":"com","childKey":0})
		addComT.save(function(){
			console.log("comTime init");
			totalCheck();
			});
		var addClientT=new data_mg.updateTime({"parentKey":"client","childKey":0})
		addClientT.save(function(){
			console.log("clientTime init");
			totalCheck();
			});
		var addRealNameT=new data_mg.updateTime({"parentKey":"realName","childKey":0})
		addRealNameT.save(function(){
			console.log("realNameTime init");
			totalCheck();
			});
		var addCardBindT=new data_mg.updateTime({"parentKey":"cardBind","childKey":0})
		addCardBindT.save(function(){
			console.log("cardBindTime init");
			totalCheck();
			});
		var addPromoT=new data_mg.updateTime({"parentKey":"promotion","childKey":new Date().getTime()})
		addPromoT.save(function(){
			console.log("promoTime init");
			totalCheck();
			});
}
/***********************************************************************************/
var emptyDB=function(){
		var totalCount=0;
		function totalCheck(){
			totalCount++;
			if(totalCount==15){
				initDB();
				}
			}
		data_mg.product.remove({},function(){
			console.log("product empty");
			totalCheck();
			});
		data_mg.obj.remove({},function(){
			console.log("obj empty");
			totalCheck();
			});
		data_mg.type.remove({},function(){
			console.log("type empty");
			totalCheck();
			});
		data_mg.com.remove({},function(){
			console.log("com empty");
			totalCheck();
			});
		data_mg.client.remove({},function(){
			console.log("client empty");
			totalCheck();
			});
		data_mg.realName.remove({},function(){
			console.log("realName empty");
			totalCheck();
			});
		data_mg.cardBind.remove({},function(){
			console.log("cardBind empty");
			totalCheck();
			});
		data_mg.account.remove({},function(){
			console.log("account empty");
			totalCheck();
			});
		data_mg.client_password.remove({},function(){
			console.log("client_password empty");
			totalCheck();
			});
		data_mg.invite.remove({},function(){
			console.log("invite empty");
			totalCheck();
			});
		data_mg.redPacket.remove({},function(){
			console.log("redPacket empty");
			totalCheck();
			});
		data_mg.promotion.remove({},function(){
			console.log("promotion empty");
			totalCheck();
			});
		data_mg.count.remove({},function(){
			console.log("count empty");
			totalCheck();
			});
		data_mg.config.remove({},function(){
			console.log("config empty");
			totalCheck();
			});
		data_mg.updateTime.remove({},function(){
			console.log("updateTime empty");
			totalCheck();
			});
}
	emptyDB();
	//showDB();
/***********************************************************************************/	
 	 var io = require('socket.io').listen(app.target)
app.target.listen(8888);
 
 io.sockets.on('connection', function (socket) {
 	console.log("连上了");
   socket.emit('connected', { hello: 'world' });
   socket.on('server',function(data){
   		if(data&&data.model&&data.action&&server[data.model]&&server[data.model][data.action]){
   			server[data.model][data.action](socket,data);
   		}
   	});


 });