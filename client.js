var http = require('http');  
var qs = require('querystring');  

var crypto = require('crypto');
var userName = 'wdfc'
var password = '123123'
var md5 = crypto.createHash('md5');
md5.update(password);
var d = md5.digest('hex');
var md6=crypto.createHash('md5');
md6.update(userName+d);
var b = md6.digest('hex');
var options = {  
    hostname: 'www.jc-chn.cn',   
    path: '/smsSend.do',  
    method: 'POST',  
    headers: {  
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'  
    }  
}; 
/**********************************************************************/
var nodemailer = require("nodemailer");
// 开启一个 SMTP 连接池
var smtpTransport = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: '394127821@qq.com',
        pass: 'jiumogaoao86'
    }
});

/************************************************************************/


function getToken(socket,data,fn){
	console.log("client/getToken");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data);
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_getToken",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
	}
	console.log(tokenArry);
	if(data.data.tk&&tokenArry[data.data.tk]){
		console.log("有传入tk,且已有");
		if(tokenArry[data.data.tk].user.id){
			data_mg.client.findOne({id:tokenArry[data.data.tk].user.id},function(err,doc){
				if(err){
					console.log(err)
					result.success=false;
					result.message="获取用户信息失败"
				}else{
					result.data={tk:data.data.tk,user:doc};
					result.success=true;
					result.code=1;
					result.time=new Date().getTime();
				}
				returnFn();
			});
		}else{
			result.data=tokenArry[data.data.tk];
			result.success=true;
			result.code=1;
			result.time=new Date().getTime();
			console.log(result)
			returnFn();
		}	
		}else{
		console.log("新tk");
		var tokenA=data.data.tk||uuid();
		console.log(tokenA);
	tokenArry[tokenA]={
		tk:tokenA,
		user:{}
		}
		console.log(tokenArry)
	var clearTime=setTimeout(function(){
		console.log("tk失效");
		delete tokenArry[tokenA];
		},1000*60*60*2);
	result.data=tokenArry[tokenA];
	data_mg.count.update({"name":"totalView"},{$inc:{number:1}},{},function(){
		result.success=true;
		result.code=1;
		result.time=new Date().getTime();
		console.log(result)
		returnFn();	
	})
			}
	
	};
/*******************************************************************/
function checkUser(socket,data,fn){
	console.log("client/checkUser");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data);
	//data.data="name";
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_checkUser",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
	data_mg.client.find({userName:data.data.userName},function(err,doc){
		if(err){
			result.success=false;
			result.message="搜索用户名出错";
			returnFn();
			}else{
				if(doc&&doc.length){
			result.success=true;
			result.data=doc[0].id;
			}else{
				result.success=true;
				}
			returnFn();
				}
		
		})
		
};
/********************************************************************/
function checkPhone(socket,data,fn){
	console.log("client/checkPhone");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_checkPhone",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
	data_mg.client.find({phone:data.data.phone},function(err,doc){
		if(err){
			result.success=false;
			result.message="搜索手机号出错";
			returnFn();
			}else{
				if(doc&&doc.length){
			result.success=true;
			result.data=doc[0].id;
			}else{
				result.success=true;
				}
				returnFn();
				}
		})
};
/********************************************************************/
function checkEmail(socket,data,fn){
	console.log("client/checkEmail");
	
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
		console.log(data.data)
	var result={
		code:0,
		time:0,
		data:{},
		success:false,
		message:""
		};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_checkEmail",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
	data_mg.client.find({phone:data.data.email},function(err,doc){
		if(err){
			console.log(err);
			result.success=false;
			result.message="搜索邮箱出错"
			returnFn();
			}else{
				if(doc&&doc.length){
			result.success=true;
			result.data=doc[0].id;
			}else{
				result.success=true;
				}
				returnFn();
				}
		})
};
/***************************************************************************/
function login(socket,data,fn){
	console.log(data);
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log("client/login");
	//data.data = {"tk":"xxxx",:"userName":"aa",/*登录名/手机/邮箱*/
	//			"passWord":"djisk"}/*密码*/
	
	console.log(data.data)
	var result={
		success:false,
		code:0,
		message:"",
		data:{},
		time:0
					};
					
	var returnFunction=function(){
		if(socket){
	 	socket.emit("client_login",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}				
	//returnFunction();
	//return;				
	data_mg.client.$where('this.userName == "'+data.data.userName+'" || this.email == "'+data.data.userName+'" || this.phone == "'+data.data.userName+'"').exec(function(err,doc){
		console.log(err)
		console.log(doc)
		if(doc&&doc.length){
			data_mg.client_password.findOne({"parentKey":doc[0].id,"childKey":data.data.passWord},function(errA,docA){
				console.log(errA)
				console.log(docA)
				if(docA){
					doc[0].lastTime=doc[0].time||new Date().getTime();
					doc[0].lastIp=doc[0].ip||"none";
					doc[0].time=new Date().getTime();
					doc[0].ip=data.ip || "none";
					console.log(doc[0]);
					data_mg.client.update({"id":doc[0].id},{"$set":{"lastTime":doc[0].time||new Date().getTime(),lastIp:doc[0].ip||"none",time:new Date().getTime(),ip:data.ip || "none"}},{},function(errB){
						console.log("updateClient")
						if(errB){
							console.log(errB)
							result.success=false;
							result.message="修改登录时间失败";
							}else{
								console.log("succeed")
								result.success=true;
								result.code=1;
								if(!tokenArry[data.data.tk]){
									tokenArry[data.data.tk]={tk:data.data.tk,user:{}}
									}
								tokenArry[data.data.tk].user=doc[0];
								console.log(tokenArry)
					result.data=doc[0];
								}
							returnFunction();	
						})
					
					}else{
						console.log(errA)
						result.success=false;
						result.message="密码错误";
						returnFunction();
						}
				
				})
			}else{result.success=false;
			console.log(err)
						result.message="账号不存在";
			returnFunction();
			}
		})
		
};
/*******************************************************************************************************/
function register(socket,data,fn){
	console.log("client/register");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
		console.log(data.data)
		var newUserId=uuid();
	var newData={
		"id":newUserId,/*id*/
		"type":1,/*类型,1普通用户2管理用户*/
		"userName":"",/*用户名*/
		"dsc":"",/*简介*/
		"image":"",/*头像*/
		"phone":data.data.phone,/*手机*/
		"email":"",/*邮箱*/
		"introducer":data.data.introducer||"",/*介绍人*/
		"lastTime":0,/*上次登录时间*/
		"lastIp":"",/*上次登录IP*/
		"time":0,/*当前登录时间*/
		"ip":"",/*当前登录ip*/
		"balance":0,
		"redpacket":0,
		"password":data.data.password/*密码*/
		}
	//data.data={
	//	"id":uuid(),/*id*/
	//	"type":1,/*类型,1普通用户2管理用户*/
	//	"userName":"用户名",/*用户名*/
	//	"image":"http://",/*头像*/
	//	"place":"地址",/*地址*/
	//	"phone":"18239208903",/*手机*/
	//	"email":"fhdj@email.com",/*邮箱*/
	//	"name":"真实名",/*真实姓名*/
	//	"contacts":"联系人",/*联系人*/
	//	"contactsPhone":"2738948393",/*联系人电话*/
	//	"record":"本科",/*学历*/
	//	"university":"华农",/*毕业院校*/
	//	"job":"这个职位",/*职位*/
	//	"company":"公司",/*公司*/
	//	"password":"123456"/*密码*/
	//}
	var result={
		success:false,
		code:0,
		message:"",
		data:{},
		time:0
		};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_register",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
		}
		if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].code){
			if(tokenArry[data.data.tk].code==data.data.code){
					var newClient=new data_mg.client(newData)
	newClient.save(function(err,Clientsc){
		console.log(Clientsc)
		if(err){
			console.log(err)
			result.success=false;
			result.message="添加用户失败";
			returnFn();
			}else{
				var newPassword=new data_mg.client_password({
					"parentKey":newUserId,
					"childKey":data.data.password,
					})
				newPassword.save(function(errA,Passsc){
					console.log(Passsc)
					if(errA){
						console.log(errA)
						result.success=false;
						result.message="添加密码失败";
						returnFn();
						}else{
							data_mg.updateTime.update({"parentKey":"client"},{$set:{"childKey":new Date().getTime()}},{},function(errB){
								if(errB){
									console.log(errB)
									result.success=false;
									result.message="更新时间失败";
									returnFn();
								}else{
									var newRealName=new data_mg.realName({
																	"id":newUserId,/*id*/
																	"name":"",/*真实姓名*/
																	"sex":"0",/*性别*/
																	"cardType":"0",/*证件类型*/
																	"place":"",/*地区*/
																	"birthday":new Date().getTime(),/*生日*/
																	"cardNumber":"",/*证件号*/
																	"startTime":new Date().getTime(),/*开始时间*/
																	"endTime":new Date().getTime(),/*结束时间*/
																	"image":"",/*证件照*/
																	"state":0/*审核状态*/
																	})	
																newRealName.save(function(errz){
																	if(errz){
																		console.log(errz)
																		result.message="创建实名制信息出错"
																		result.success=false;
																		returnFn();	
																		}else{
		data_mg.updateTime.update({"parentKey":"realName"},{$set:{"childKey":new Date().getTime()}},{},function(errH){
			if(errH){
				console.log(errH)
				result.message="更新实名制时间出错"
				result.success=false
				returnFn();	
				}else{
					var newCardBind=new data_mg.cardBind({
						"id":newUserId,/*id*/
						"name":"",/*开户名*/
						"number":"",/*银行卡*/
						"place":"",/*开户城市*/
						"bank":"",/*开户支行*/
						"state":0/*审核状态*/
						})
						newCardBind.save(function(errM){
							if(errM){
								console.log(errM);
								result.message="创建银行卡绑定信息失败";
								result.success=false;
								returnFn();	
								}else{
									data_mg.updateTime.update({"parentKey":"cardBind"},{$set:{"childKey":new Date().getTime()}},{},function(errN){
										if(errN){
											console.log(errN);
											result.message="更新绑定事件失败"
											result.success=false;
											returnFn();	
											}else{
												result.success=true;
																result.code=1;
																tokenArry[data.data.tk]={tk:data.data.tk,user:{
		"id":newUserId,/*id*/
		"type":1,/*类型,1普通用户2管理用户*/
		"userName":"",/*用户名*/
		"image":"",/*头像*/
		"dsc":"",/*简介*/
		"phone":data.data.phone,/*手机*/
		"email":"",/*邮箱*/
		"introducer":data.data.introducer||"",/*介绍人*/
		"lastTime":0,/*上次登录时间*/
		"lastIp":"",/*上次登录IP*/
		"time":0,/*当前登录时间*/
		"ip":"",/*当前登录ip*/
		"balance":0,
		"redpacket":0
		}}
																
																if(data.data.introducer){
																	console.log("有邀请人")
																	var newInvite=new data_mg.invite({
																		"id":uuid(),/*id*/
																		"inviter":data.data.introducer,/*邀请人id*/
																		"user":newUserId,/*被邀请人id*/
																		"money":10,/*奖金*/
																		"type":0/*类型*/
																		});
																		newInvite.save(function(errE){
																			if(errE){
																				console.log(errE);
																				}else{
																					var newRedPacket=new data_mg.redPacket({"id":uuid(),
		"userId":data.data.introducer,
		"money":10,
		"type":0,
		"strat":new Date().getTime(),
		"end":0});
		newRedPacket.save(function(errG){
			if(errG){
																				console.log(errG);
																				}else{
																
																							data_mg.client.update({id:data.data.introducer},{$inc:{"redpacket":10}},{},function(errX){
																								console.log(errX)
																							});
																						
								
																				}
			})
																					}
																			});
																	}	
																	returnFn();	
												}
										})
									}
							})
					}
			})
																			}
																	});	
																	
																/************************************************/
																
																	/*******************************************/
								}
								
							})
							}
						
					})
				}
			
		})
			}else{
				result.success=false;
			result.message="验证码错误"
			returnFn();
			}
		}else{
			result.success=false;
			result.message="未获取验证码或验证买校验失败"
			returnFn();
		}
	
	
};
/*******************************************************************************************************/
function resetKey(socket,data,fn){
	console.log("client/resetKey");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
		console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
		function returnFn(){
			if(socket){
	 	socket.emit("client_resetKey",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
			}
		if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user){
			data_mg.client_password.update({"parentKey":tokenArry[data.data.tk].user.id,"childKey":data.data.oldKey},{$set:{"childKey":data.data.newKey}},{},function(err){
		if(err){
			console.log(err)
			result.success=false;
			result.message="修改失败";
			}else{
				result.success=true;
				result.code=1
				}
			returnFn();
		})
			}else{
				result.success=false;
				result.message="登陆信息超时,请重新登陆";
				returnFn();
				}
	
		
};
/*******************************************************************************************************/
function resetAllKey(socket,data,fn){
	console.log("client/resetAllKey");
	//data.data = "ddgdgd"/*管理员id*/
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={code:0,
		time:0,
		data:[],
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_resetAllKey",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
	}
	console.log("修改password")
	var lock=1;
	var callbackcount=0;
	var errSend=1;
	var callbackFn=function(){
		if(lock){
			callbackcount++;
			if(callbackcount==data.data.list.length){
				console.log("更新成功")
				result.success=true;
					result.code=1;
					returnFn()
				}
			}else{
				if(errSend){
					errSend=0;
					returnFn();
					}
				}
		}
		for (var i=0;i<data.data.list.length;i++){
			if(lock){
				data_mg.client_password.update({"parentKey":data.data.list[i]},{$set:{childKey:"123456"}},{},function(err){
					console.log(data.data.list[i])
		if(err){
			console.log(err)
			lock=0;
			result.success=false;
			result.message="重置出错";
			result.code=0
		}
		callbackFn();
	})
				}
			
			}
	
		
};
/*************************************************************************************/
function get(socket,data,fn){
	console.log("client/get");
	//data.data = 10086/*不用传*/
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""
		};
		var returnFn=function(){
			if(socket){
		 		socket.emit("client_get",result);
		 	}
		 	else if(fn){
		 		var returnString = JSON.stringify(result);
		 		fn(returnString);
		 	}
		}
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.type==2){
		data_mg.updateTime.findOne({"parentKey":"client"},function(err,doc){
	if(err){
		console.log(err);
		result.success=false;
		result.message="获取更新时间失败"
		returnFn();
	}else{
		if(doc&&doc.childKey>data.data.time){console.log("有更新")
			result.time=doc.childKey;
			data_mg.client.$where('this.type != 2').exec(function(errA,docA){
				if(errA){
					console.log(errA)
					result.success=false;
		result.message="获取用户失败"
				}else{
					if(docA){
						console.log(docA)
						result.success=true;
						result.code=1
						result.data=docA
					}
				}
				returnFn();
			})
		}else{console.log("没更新")
			result.success=true;
			result.code=0;
			returnFn();
		}
	}
	
})
		}else{
			result.success=false;
			result.message="登录超时或不是管理员帐号";
			returnFn();
			}	

		
};

/**************************************************************************************/

function edit(socket,data,fn){
	console.log("client/edit");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_edit",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
	}
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user){
		data_mg.client.update({"id":tokenArry[data.data.tk].user.id},{$set:data.data},{},function(err){
		console.log("更新回调")
		if(err){
			console.log(err)
			result.success=false;
			result.message="修改失败";
			returnFn()
		}else{
			console.log("开始更新时间")
			data_mg.updateTime.update({"parentKey":"client"},{$set:{"childKey":new Date().getTime()}},{},function(errA){
				console.log("更新回调")
				if(errA){
					console.log(errA)
					result.success=false;
			result.message="更新用户信息失败";
				}else{
					console.log("修改成功")
					result.success=true;
					result.code=1
					tokenArry[data.data.tk].user.userName=data.data.userName,
					tokenArry[data.data.tk].user.image=data.data.image,
					tokenArry[data.data.tk].user.dsc=data.data.dsc,
					tokenArry[data.data.tk].user.phone=data.data.phone,
					tokenArry[data.data.tk].user.email=data.data.email
				}
				returnFn();
			})
		}
	})
		}else{
		result.success=false;
		result.message="登录超时,请重新登录";
		returnFn();
		}	
};
/***********************************************************************************************/
function remove(socket,data,fn){
	console.log("client/remove");
	//data.data = "ddssfs"/*商品id*/
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={success:false,
		code:0,
		message:"",
		data:{},
		time:0};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_edit",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
	}
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.type==2){
		var lock=1;
	var callbackcount=0;
	var errSend=1;
	var callbackFn=function(){
		if(lock){
			callbackcount++;
			if(callbackcount==data.data.list.length){
				data_mg.updateTime.update({"parentKey":"client"},{$set:{"childKey":new Date().getTime()}},{},function(err){
					if(err){
						console.log(err);
						result.success=false;
						result.message="更新时间出错";
						result.code=0;
					}else{
						result.success=true;
						result.code=1;
					}

					returnFn()
				})
				}
			}else{
				if(errSend){
					errSend=0;
					returnFn();
					}
				}
		}
		for (var i=0;i<data.data.list.length;i++){
			if(lock){
				data_mg.client.remove({"id":data.data.list[i]},function(err){
					console.log(data.data.list[i])
		if(err){
			console.log(err)
			lock=0;
			result.success=false;
			result.message=data.data.list[i]+"删除用户出错";
			result.code=0
			callbackFn();
		}else{
			data_mg.client_password.remove({"parentKey":data.data.list[i]},function(errA){
				if(errA){
					console.log(errA);
					lock=0;
					result.success=false;
					result.message=data.data.list[i]+"删除用户出错";
					result.code=0;
					callbackFn();
				}else{
					data_mg.realName.remove({"id":data.data.list[i]},function(errB){
						if(errB){
							console.log(errB);
							lock=0;
							result.success=false;
							result.message=data.data.list[i]+"删除实名信息出错";
							result.code=0;
							callbackFn();
						}else{
							data_mg.cardBind.remove({"id":data.data.list[i]},function(errC){
								if(errC){
									console.log(errC);
									lock=0;
									result.success=false;
									result.message=data.data.list[i]+"删除银行卡信息出错";
									result.code=0;
									callbackFn();
								}else{
									callbackFn();
								}
							})
						}
					});
				}
			})
		}
		
	})
				}
			
			}
		}else{
		result.success=false;
		result.message="登录超时,请重新登录";
		returnFn();
		}	
	
	
};
/*************************************************************************************************/
function getSafeQusetion(socket,data,fn){
	console.log("client/getSafeQusetion");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	function returnFn(){
		if(socket){
	 	socket.emit("client_getSafeQusetion",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
		}
	data_mg.saveQuestion.findOne({"id":data.data.id},function(err,doc){
		if(err){
			console.log(err);
			result.success=false
			result.message="找不到该问题"
			}else{
				result.success=true;
				result.code=1;
				result.data={"question1":doc.question1,
		"question2":doc.question2};
				}
			returnFn()
		})
	
	
};
/**************************************************************************/
function setSafeQusetion(socket,data,fn){
	console.log("client/setSafeQusetion");
	if(data.data&&typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data);
	var result={
		code:0,
		time:0,
		data:{},
		success:false,
		message:""
		};
	function returnFn(){
		if(socket){
	 	socket.emit("client_setSafeQusetion",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
		}
	if(tokenArry[data.data.token]&&tokenArry[data.data.token].user){
		data_mg.saveQuestion.update({"id":tokenArry[data.data.token].user.id},{"$set":data.data},{},function(err){
		if(err){
			console.log(err)
			result.success=false;
			result.message="修改错误";
			}else{
				result.success=true;
				}
			returnFn()	
		})
		}else{
		result.success=false;
		result.message="登录超时,请重新登录";
		returnFn();
		}	
};
/**********************************************************************************/
function checkSafeQusetion(socket,data,fn){
	console.log("client/checkSafeQusetion");
	if(data.data&&typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data);
	var result={
		code:0,
		time:0,
		data:{},
		success:false,
		message:""
		};
		function returnFn(){
			if(socket){
	 	socket.emit("client_checkSafeQusetion",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
			}
	data_mg.saveQuestion.findOne({id:data.data.id},function(err,doc){
		if(err){
			console.log(err);
			result.success=false;
			result.message="找不到该用户安全问题";
			}else{
				if(data.data.answer1==doc.answer1&&data.data.answer2==doc.answer2){
					result.success=true;
					}else{
						result.success=false;
						result.message="回答错误";
						}
				}
			returnFn();
		});
};
/**********************************************************************************/
function bind(socket,data,fn){
	console.log("client/bind");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
		console.log(data.data)
	var result={
		code:0,
		time:0,
		data:{},
		success:false,
		message:""
		};
	function returnFn(){
		if(socket){
	 	socket.emit("client_bind",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
	if(tokenArry[data.data.token]&&tokenArry[data.data.token].user){
		data_mg.bindCode.findOne({"type":data.data.type,"number":data.data.number},function(err,doc){
		if(err){
			console.log(err);
			result.success=false;
			result.message="号码错误"
			returnFn();
			}else{
				if(doc){console.log("有数据")
					if(doc.code==data.data.code){console.log("验证码正确,删除数据")
						data_mg.bindCode.remove({"type":data.data.type,"number":data.data.number},function(errB){
							if(errB){
								console.log(errB);
								result.success=false;
								result.message="删除数据错误"
								returnFn();
								}else{console.log("添加绑定")
									var setTrue={};
									setTrue[data.data.type]=true;
									data_mg.bind.update({"id":tokenArry[data.data.token].user.id},{$set:setTrue},{},function(errC){
										if(errC){
											result.success=false;
											result.message="更新绑定数据错误"
								returnFn();
											}else{console.log("更新客户端")
												var setType={};
												setType[data.data.type]=data.data.number;
												data_mg.client.update({"id":tokenArry[data.data.token].user.id},{$set:setType},{},function(errD){
													if(errD){
														result.success=false;
														result.message="更新客户数据错误"
														}else{
															result.success=true;
															}
														returnFn();
													})
												}
										})
									}
							})
						}else{
							console.log("验证码不正确")
							console.log(doc.code)
							console.log(data.data.code)
							result.success=false;
							result.message="验证码不正确"
							returnFn();
							}
					}else{
						result.success=false;
							result.message="没有该号"
			returnFn();
						}
				}
		})	
		}else{
		result.success=false;
		result.message="登录超时,请重新登录";
		returnFn();
		}		
	
};
/***************************************************************************************/
function getPhoneCode(socket,data,fn){
	console.log("client/getPhoneCode");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data);
		}
	console.log(data.data);
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	function returnFn(){
		if(socket){
	 	socket.emit("client_getPhoneCode",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
	if(data.data.tk&&tokenArry[data.data.tk]){
		var code=Math.round(Math.random()*1000000);
		tokenArry[data.data.tk].code=code;
				console.log(data.data.number)
				console.log(code)
					var post_data = {  
    					username: userName,  
    					password: b,
						mobile:data.data.number,
						content:"【星众众筹】你的验证码是"+code,
						dstime:null
						};//这是需要提交的数据  
  
				var content = qs.stringify(post_data);
				var req = http.request(options, function (res) {  
					console.log('STATUS: ' + res.statusCode);  
					console.log('HEADERS: ' + JSON.stringify(res.headers));  
					res.setEncoding('utf8');  
					res.on('data', function (chunk) {  
					console.log(chunk)
						result.code=1;
						result.success=true;
							result.data=code;
							console.log(code)
							  returnFn()
					});  
				});  
				  
				req.on('error', function (e) {  
					result.success=false;
		result.message="验证码发送失败";
					returnFn()
				});  
				  
				// write data to request body  
				req.write(content);  
				  
				req.end();
				
	}
}
function getBindCode(socket,data,fn){
	console.log("client/getBindCode");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data);
		}
	console.log(data.data);
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	function returnFn(){
		if(socket){
	 	socket.emit("client_getBindCode",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
	data_mg.bindCode.findOne({"type":data.data.type,"number":data.data.number},function(err,doc){
		if(err){console.log(err)
		result.success=false;
		result.message="搜索绑定码错误";
		returnFn()
		}else{
			var code=Math.round(Math.random()*1000000)
			console.log(code)
			function sendMsg(){
				console.log(data.data.number)
				console.log(code)
					var post_data = {  
    					username: userName,  
    					password: b,
						mobile:data.data.phone,
						content:"【星众众筹】你的验证码是"+code,
						dstime:null
						};//这是需要提交的数据  
  
				var content = qs.stringify(post_data);
				var req = http.request(options, function (res) {  
					console.log('STATUS: ' + res.statusCode);  
					console.log('HEADERS: ' + JSON.stringify(res.headers));  
					res.setEncoding('utf8');  
					res.on('data', function (chunk) {  
					console.log(chunk)
						result.code=1;
						result.success=true;
							result.data=code;
							console.log(code)
							  returnFn()
					});  
				});  
				  
				req.on('error', function (e) {  
					result.success=false;
		result.message="绑定码发送失败";
					returnFn()
				});  
				  
				// write data to request body  
				req.write(content);  
				  
				req.end();
				}
			if(doc){
				console.log("修改code")
				console.log(code)
				data_mg.bindCode.update({"type":data.data.type,"number":data.data.number},{$set:{"code":code}},{},function(errA){
					if(errA){
						console.log(errA)
						result.success=false;
		result.message="绑定码更新失败";
						returnFn();
						}else{
							console.log(b);
							if(data.data.type=="phone"){
								sendMsg()
								}else{
									// 设置邮件内容
var mailOptions = {
  from: "jiumogaoao<394127821@qq.com>", // 发件地址
  to: data.data.number, // 收件列表
  subject: "test", // 标题
  text: 'Hello world ✔',
  html: "<b>test</b> "+code // html 内容
}
// 发送邮件
smtpTransport.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error);
	result.success=false;
		result.message="邮件发送失败";
	 returnFn()
  }else{
    console.log("Message sent: " + info.response);
	result.success=true;
	result.code=1;
							result.data=code;
							  returnFn()
  }
  smtpTransport.close(); // 如果没用，关闭连接池
});
									}
							}
						
					})
				}else{
					console.log("创建code")
					var codebind=new data_mg.bindCode({"type":data.data.type,"number":data.data.number,"code":code})
					codebind.save(function(errA){
						if(errA){
						console.log(errA)
						result.success=false;
		result.message="添加绑定码失败";
						returnFn();
						}else{
							console.log(b);
							if(data.data.type=="phone"){
								sendMsg()
								}else{
									// 设置邮件内容
var mailOptions = {
   from: "jiumogaoao<394127821@qq.com>", // 发件地址
  to: data.data.number, // 收件列表
  subject: "test", // 标题
  text: 'Hello world ✔',
  html: "<b>test</b> "+code // html 内容
}
// 发送邮件
smtpTransport.sendMail(mailOptions, function(error, info){
  if(error){
    console.log(error);
	result.success=false;
		result.message="邮件发送失败";
	 returnFn()
  }else{
    console.log("Message sent: " + info.response);
	result.success=true;
	result.code=1;
							result.data=code;
							  returnFn()
  }
  smtpTransport.close(); // 如果没用，关闭连接池
});
									}
							
							}
						
						})
				}
			}
		})
		
};
/******************************************************************************/
function getBind(socket,data,fn){
	console.log("client/getBind");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data);
		}
	console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	function returnFn(){
		if(socket){
	 	socket.emit("client_getBind",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
	if(tokenArry[data.data.token]&&tokenArry[data.data.token].user){
		data_mg.bind.findOne({id:tokenArry[data.data.token].user.id},function(err,doc){
		if(err){
			console.log(err);
			result.success=false;
			result.message="搜索绑定信息出错"
			}else{
				if(doc){
					result.success=true;
					result.code=1;
					result.data=doc;
					}else{console.log("找不到绑定信息")
						result.success=false;
						result.message="找不到该信息"
						}
				}
				returnFn()
		});	
		}else{
		result.success=false;
		result.message="登录超时,请重新登录";
		returnFn();
		}
	
		
};
/************************************************************************************************/
function realGet(socket,data,fn){
	console.log("client/realGet");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={
					code:0,
		time:0,
		data:[],
		success:false,
		message:""
					};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_realGet",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
	}
	//returnFn();
	//return;
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user){
		data_mg.updateTime.find({"parentKey":"realName"},function(err,doc){
		if(err){
			result.success=false;
			result.message="获取更新时间失败";
			console.log(err);
			returnFn();
		}else{
			console.log(doc)
			if(doc&&doc.length&&doc[0].childKey>data.data.time){
				result.code=1;
				result.time=doc[0].childKey
				data_mg.realName.find({id:tokenArry[data.data.tk].user.id},function(errA,docA){
					if(errA){
						result.success=false;
						result.message="获取项目列表失败";
						console.log(errA);
					}else{
						result.success=true;
						result.data=docA;
					}
					returnFn();
				});
			}else{
				result.success=true;
				result.code=2;
				returnFn();
			}
		}
	})
		}else{
		result.success=false;
		result.message="未登录"
		returnFn()
		}
};
/******************************************************************************************/
function realEdit(socket,data,fn){
	console.log("client/realEdit");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_realEdit",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
	}
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user){
		data_mg.realName.update({"id":tokenArry[data.data.tk].user.id},{$set:data.data},{},function(err){
		console.log("更新回调")
		if(err){
			console.log(err)
			result.success=false;
			result.message="修改失败";
			returnFn()
		}else{
			console.log("开始更新时间")
			data_mg.updateTime.update({"parentKey":"realName"},{$set:{"childKey":new Date().getTime()}},{},function(errA){
				console.log("更新回调")
				if(errA){
					console.log(errA)
					result.success=false;
			result.message="更新用户信息失败";
				}else{
					console.log("修改成功")
					result.success=true;
					result.code=1
				}
				returnFn();
			})
		}
	})
		}else{
		result.success=false;
		result.message="登录超时,请重新登录";
		returnFn();
		}	
};
/************************************************************************************************/
function cardGet(socket,data,fn){
	console.log("client/cardGet");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={
					code:0,
		time:0,
		data:[],
		success:false,
		message:""
					};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_cardGet",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
	}
	//returnFn();
	//return;
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user){
		data_mg.updateTime.find({"parentKey":"cardBind"},function(err,doc){
		if(err){
			result.success=false;
			result.message="获取更新时间失败";
			console.log(err);
			returnFn();
		}else{
			console.log(doc)
			if(doc&&doc.length&&doc[0].childKey>data.data.time){
				result.code=1;
				result.time=doc[0].childKey
				data_mg.cardBind.find({id:tokenArry[data.data.tk].user.id},function(errA,docA){
					if(errA){
						result.success=false;
						result.message="获取项目列表失败";
						console.log(errA);
					}else{
						result.success=true;
						result.data=docA;
					}
					returnFn();
				});
			}else{
				result.success=true;
				result.code=2;
				returnFn();
			}
		}
	})
		}else{
		result.success=false;
		result.message="未登录"
		returnFn()
		}
};
/******************************************************************************************/
function cardEdit(socket,data,fn){
	console.log("client/cardEdit");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("client_cardEdit",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
	}
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user){
		data_mg.cardBind.update({"id":tokenArry[data.data.tk].user.id},{$set:data.data},{},function(err){
		console.log("更新回调")
		if(err){
			console.log(err)
			result.success=false;
			result.message="修改失败";
			returnFn()
		}else{
			console.log("开始更新时间")
			data_mg.updateTime.update({"parentKey":"cardBind"},{$set:{"childKey":new Date().getTime()}},{},function(errA){
				console.log("更新回调")
				if(errA){
					console.log(errA)
					result.success=false;
			result.message="更新用户信息失败";
				}else{
					console.log("修改成功")
					result.success=true;
					result.code=1
				}
				returnFn();
			})
		}
	})
		}else{
		result.success=false;
		result.message="登录超时,请重新登录";
		returnFn();
		}	
};
/**********************************************************************************/
function accountIn(socket,data,fn){
	console.log(data);
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log("client/accountIn");
	//data.data = {"tk":"xxxx",:"userName":"aa",/*登录名/手机/邮箱*/
	//			"passWord":"djisk"}/*密码*/
	
	console.log(data.data)
	var result={
		success:false,
		code:0,
		message:"",
		data:{},
		time:0
					};
					
	var returnFunction=function(){
		if(socket){
	 	socket.emit("client_accountIn",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
		if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.id){
			var newIn=new data_mg.account({"id":uuid(),/*id*/
		"userid":tokenArry[data.data.tk].user.id,/*帐号*/
		"money":data.data.number,/*金额*/
		"type":"0",/*0充值1提现*/
		"time":new Date().getTime(),/*时间*/
		"state":"1"/*0进行中1已完成*/});
			newIn.save(function(err){
				if(err){
					console.log(err);
					result.success=false;
					result.message="充值提交失败";
					returnFunction();
				}else{
					data_mg.client.update({id:tokenArry[data.data.tk].user.id},{$inc:{balance:data.data.number}},{},function(errA){
						if(errA){
							console.log(errA);
							result.success=false;
							result.message="修改金额失败";
						}else{
							result.success=true;
							result.code=1;
						}
						returnFunction();
					})
				}
			});
		}else{
			console.log("登录信息超时")
			result.success=false;
			result.message="登录信息超时";
			returnFunction();
		}
	}				
/**********************************************************************************/
function accountOut(socket,data,fn){
	console.log(data);
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log("client/accountOut");
	//data.data = {"tk":"xxxx",:"userName":"aa",/*登录名/手机/邮箱*/
	//			"passWord":"djisk"}/*密码*/
	
	console.log(data.data)
	var result={
		success:false,
		code:0,
		message:"",
		data:{},
		time:0
					};
					
	var returnFunction=function(){
		if(socket){
	 	socket.emit("client_accountOut",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
		console.log("开始")
		if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.id){
			data_mg.client.findOne({id:tokenArry[data.data.tk].user.id},function(err,user){
				if(err){
					console.log(err);
					result.success=false;
					result.message="用户信息获取失败";
					returnFunction();
				}else{
					console.log("找到用户")
					console.log(user);
					if(user.balance<data.data.number){
						console.log("余额不足")
						result.success=false;
						result.message="余额不足";
						returnFunction();
					}else{
						console.log("添加提现记录")
						var newIn=new data_mg.account({"id":uuid(),/*id*/
						"userid":tokenArry[data.data.tk].user.id,/*帐号*/
						"money":data.data.number,/*金额*/
						"type":"1",/*0充值1提现*/
						"time":new Date().getTime(),/*时间*/
						"state":"1"/*0进行中1已完成*/});
							newIn.save(function(errA){
								if(errA){
									console.log(errA);
									result.success=false;
									result.message="充值提交失败";
									returnFunction();
								}else{
									console.log("开始改数值")
									console.log(tokenArry[data.data.tk].user.id)
									console.log(user.balance)
									console.log(data.data.number)
									data_mg.client.update({id:tokenArry[data.data.tk].user.id},{$inc:{balance:-data.data.number}},{},function(errB){
										if(errB){
											console.log(errB);
											result.success=false;
											result.message="修改金额失败";
										}else{console.log("修改成功")
											result.success=true;
											result.code=1;
										}
										returnFunction();
									})
								}
							});
					}
					
				}
			})
			
		}else{
			console.log("登录信息超时")
			result.success=false;
			result.message="登录信息超时";
			returnFunction();
		}
	}				
/**********************************************************************************/
function accountGet(socket,data,fn){
	console.log(data);
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log("client/accountGet");
	//data.data = {"tk":"xxxx",:"userName":"aa",/*登录名/手机/邮箱*/
	//			"passWord":"djisk"}/*密码*/
	
	console.log(data.data)
	var result={
		success:false,
		code:0,
		message:"",
		data:{},
		time:0
					};
					
	var returnFunction=function(){
		if(socket){
	 	socket.emit("client_accountGet",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
		if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.id){
			data_mg.account.find({userid:tokenArry[data.data.tk].user.id},function(err,doc){
				if(err){
					console.log(err);
					result.message="获取账户信息出错"
					result.success=false;
				}else{
					result.success=true;
					result.code=1;
					result.data=doc;
				}
				returnFunction();
			})
		}

	}
/**********************************************************************************/
function redPacketGet(socket,data,fn){
	console.log(data);
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log("client/redPacketGet");
	//data.data = {"tk":"xxxx",:"userName":"aa",/*登录名/手机/邮箱*/
	//			"passWord":"djisk"}/*密码*/
	
	console.log(data.data)
	var result={
		success:false,
		code:0,
		message:"",
		data:{},
		time:0
					};
					
	var returnFunction=function(){
		if(socket){
	 	socket.emit("client_redPacketGet",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
		if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.id){
			data_mg.redPacket.find({userId:tokenArry[data.data.tk].user.id},function(err,doc){
				if(err){
					console.log(err);
					result.message="获取账户信息出错"
					result.success=false;
				}else{
					result.success=true;
					result.code=1;
					result.data=doc;
				}
				returnFunction();
			})
		}

	}
/**********************************************************************************/
function visitGet(socket,data,fn){
	console.log(data);
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log("client/visitGet");
	//data.data = {"tk":"xxxx",:"userName":"aa",/*登录名/手机/邮箱*/
	//			"passWord":"djisk"}/*密码*/
	
	console.log(data.data)
	var result={
		success:false,
		code:0,
		message:"",
		data:{},
		time:0
					};
					
	var returnFunction=function(){
		if(socket){
	 	socket.emit("client_visitGet",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
		}
		data_mg.count.findOne({"name":"totalView"},function(err,doc){
			console.log(doc)
			if(err){
				console.log(err);
				result.success=false;
				result.message="获取浏览数出错";
			}else{
				result.success=true;
				result.data={number:doc.number};
				result.code=1;
			}
			returnFunction();
		})
	}
exports.getPhoneCode=getPhoneCode;
exports.visitGet=visitGet;
exports.resetAllKey=resetAllKey;
exports.redPacketGet=redPacketGet;
exports.accountGet=accountGet;
exports.accountOut=accountOut;
exports.accountIn=accountIn;
exports.cardEdit=cardEdit;
exports.cardGet=cardGet;
exports.realEdit=realEdit;
exports.realGet=realGet;
exports.getSafeQusetion=getSafeQusetion;
exports.setSafeQusetion=setSafeQusetion;
exports.checkSafeQusetion=checkSafeQusetion;
exports.checkUser=checkUser;
exports.checkPhone=checkPhone;
exports.checkEmail=checkEmail;
exports.login=login;
exports.register=register;
exports.resetKey=resetKey;
exports.get=get;
//exports.add=add;
exports.edit=edit;
exports.remove=remove;
exports.bind=bind;
exports.getBindCode=getBindCode;
exports.getBind=getBind;
exports.getToken=getToken;
