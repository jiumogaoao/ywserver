function get(socket,data,fn){
	console.log("promotion/get");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data)
		}
	console.log(data.data);
	var result={
		success:false,
		code:0,
		message:"",
		data:{},
		time:0
		};
	var returnFn=function(){
		if(socket){
	 	socket.emit("promotion_get",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
	}
//returnFn();
//return;
	data_mg.updateTime.find({"parentKey":"promotion"},function(err,doc){
		if(err){
			console.log(err)
			result.success=false;
			result.message="获取更新时间失败";
			returnFn()
		}else{
			if(doc&&doc.length&&doc[0].childKey>data.data.time){
				result.time=doc[0].childKey;
				data_mg.promotion.find({},function(errC,docC){
									if(errC){
										console.log(errC)
										result.success=false;
										result.message="获取宣传信息失败";
										returnFn()
									}else{
										result.success=true;
										result.code=1;
										result.data=docC;
										returnFn()
									}
								})
			}else{
				result.success=true;
				result.code=0
				returnFn()
			}
		}
	})
	
	
};

function edit(socket,data,fn){
	console.log("promotion/edit");
	if(typeof(data.data)=="string"){
		data.data=JSON.parse(data.data);
		}
		console.log(data.data)
	var result={code:0,
		time:0,
		data:{},
		success:false,
		message:""};
	var returnFn=function(){
		if(socket){
	 	socket.emit("promotion_edit",result);
	 }
	 	else if(fn){
	 		var returnString = JSON.stringify(result);
	 		fn(returnString);
	 	}
	}
	/*if(tokenArry[data.data.token]&&tokenArry[data.data.token].user&&tokenArry[data.data.token].user.type==2){*/
	var lock=1;
	var callBackCount=0;
	var errSend=1;
	var callBackFn=function(){
			if(lock){
				callBackCount++;
				if(callBackCount==data.data.list.length){
					console.log("更新时间")
				data_mg.updateTime.update({"parentKey":"promotion"},{$set:{"childKey":new Date().getTime()}},{},function(errA){
					if(errA){console.log(errA)
						result.success=false;
						result.message="更新宣传时间失败";
					}else{
						result.code=1;
						result.success=true;
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
		console.log("更新宣传")
		for(var i=0;i<data.data.list.length;i++){
			if(lock){
				data_mg.promotion.update({"id":data.data.list[i].id},{$set:data.data.list[i]},{},function(err){
			if(err){
				console.log(err)
				lock=0;
				result.success=false;
				result.message="修改宣传失败";
			}else{
				callBackFn();
				}
			})
				}
		}
		

	
		/*}else{
		result.success=false;
				result.message="登陆信息超时,或不是管理员帐号";
				returnFn();
		}*/

	
	
		
};


exports.get=get;
exports.edit=edit;
