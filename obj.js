function get(socket,data,fn){
	console.log("obj/get");
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
	 	socket.emit("obj_get",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
	}
	//returnFn();
	//return;
	data_mg.updateTime.find({"parentKey":"obj"},function(err,doc){
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
				data_mg.obj.find({},function(errA,docA){
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
	
};

function add(socket,data,fn){
	console.log("obj/add");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data)
	var adminData = {
		"id":uuid(),/*id*/
		"name":data.data.name,/*项目名*/
		"parentId":data.data.parentId
		}
		
	var result={
		code:0,
		time:0,
		data:[],
		success:false,
		message:""
		};
	var returnFn=function(){
		if(socket){
	 	socket.emit("obj_add",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
	}
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.type==2){
		var newObj=new data_mg.obj(adminData);
	newObj.save(function(err,Clientsc){
		console.log(Clientsc)
		if(err){
			result.success=false;
			result.message="添加项目";
			console.log(err);
			returnFn();
			}else{
			
					
							data_mg.updateTime.update({"parentKey":"obj"},{$set:{"childKey":new Date().getTime()}},{},function(errB){
								if(errB){
									result.success=false;
									result.message="更新项目失败";
									console.log(errB);
								}else{
									result.success=true;
									result.code=1;
								}
								returnFn();
							})
							
						
					
				}
			
		})
	}else{
		result.success=false;
		result.code=0;
		result.message="未登录或不是管理员帐号";
		returnFn();
	}
	
	
};

function edit(socket,data,fn){
	console.log("obj/edit");

	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
		console.log(data.data);
	var result={code:0,
		time:0,
		data:[],
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("obj_edit",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}	
	}
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.type==2){
		var sendData={}
		if(data.data.name){
			sendData.name=data.data.name;
		}
		if(data.data.parentId){
			sendData.parentId=data.data.parentId;
		}
		data_mg.obj.update({"id":data.data.id},{$set:sendData},{},function(err){
			if(err){
				console.log(err)
				result.code=0
				result.success=false;
				result.message="修改错误";
				returnFn();
			}else{
				data_mg.updateTime.update({"parentKey":"obj"},{$set:{"childKey":new Date().getTime()}},{},function(errA){
					if(errA){
						result.success=false;
						result.message="更新时间出错";
						console.log(errA)
						result.code=0
					}else{
						result.success=true;
						result.code=1
					}
					returnFn()
				})
			}
			
		})
	}else{
		result.success=false;
		result.code=0;
		result.message="未登录或不是管理员帐号";
		returnFn();
	}	
	
};

function remove(socket,data,fn){
	console.log("obj/remove");
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
	 	socket.emit("obj_remove",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
	}
	var toRemove=0;
	var haveRemove=0
	var sended=1;
	var errCount=1;
	var errSended=1;
	function removeCallback(){
		if(errCount&&sended&&toRemove==haveRemove){
			data_mg.updateTime.update({"parentKey":"obj"},{$set:{"childKey":new Date().getTime()}},{},function(errA){
					if(errA){
						result.success=false;
						result.message="更新出错";
						console.log(errA)
						result.code=0;
					}else{
						result.success=true;
						result.code=1;	
					}
					returnFn()
				})
		}
	}
	if(tokenArry[data.data.tk]&&tokenArry[data.data.tk].user&&tokenArry[data.data.tk].user.type==2){
		function reRoll(id){
			if(errCount){
				data_mg.obj.find({parentId:id},function(errFind,removePoint){
					if(removePoint&&removePoint.length){
						toRemove+=removePoint.length;
						for(var i=0;i<removePoint.length;i++){
							reRoll(removePoint[i].id);
							data_mg.obj.remove({"id":removePoint[i].id},function(err){
								if(err){
									console.log(err)
									errCount=0;
									if(errSended){
										errSended=0;
										result.success=false;
										result.message="子类型删除错误";
										returnFn()
									}
								}else{
									haveRemove++;
									removeCallback();
								}
							})
						}
					}else{
						removeCallback();
					}
				})
			}
		}
		data_mg.obj.remove({"id":data.data.id},function(err){
			if(err){
				console.log(err)
				lock=0;
				result.success=false;
				result.message="顶级删除出错";
				result.code=0;
				returnFn();
			}else{
				reRoll(data.data.id)
			}
			
		})
	}else{
		result.success=false;
		result.code=0;
		result.message="未登录或不是管理员帐号";
		returnFn();
	}			
};

exports.get=get;
exports.add=add;
exports.edit=edit;
exports.remove=remove;