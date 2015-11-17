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
		"name":data.data.name/*项目名*/
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
	var lock=1;
	var callbackCount=0;
	var errSend=1;
	var callbackFn=function(){
		if(lock){
			callbackCount++;
			if(callbackCount==data.data.list.length){
				console.log("updateTime")
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
			}else{
				if(errSend){
					errSend=0;
					returnFn()
					}
				}
		}
	console.log("updateObj")
	for (var i=0;i<data.data.list.length;i++){
		if(lock){
			data_mg.obj.update({"id":data.data.list[i].id},{$set:data.data.list[i]},{},function(err){
		if(err){
			console.log(err)
			result.code=0
			result.success=false;
			result.message="修改错误";
			lock=0;
		}
		callbackFn();
	})
			}
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
	console.log("删除obj")
	var lock=1;
	var callbackcount=0;
	var errSend=1;
	var callbackFn=function(){
		if(lock){
			callbackcount++;
			if(callbackcount==data.data.list.length){
				
			console.log("更新obj")
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
			}else{
				if(errSend){
					errSend=0;
					returnFn();
					}
				}
		}
		for (var i=0;i<data.data.list.length;i++){
			if(lock){
				data_mg.obj.remove({"id":data.data.list[i]},function(err){
		if(err){
			console.log(err)
			lock=0;
			result.success=false;
			result.message="删除出错";
			result.code=0
		}
		callbackFn();
	})
				}
			
			}
	
		
};

exports.get=get;
exports.add=add;
exports.edit=edit;
exports.remove=remove;