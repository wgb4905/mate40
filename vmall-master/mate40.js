
//定时器
var timer = null;

//检测状态
function checkElementState(path,callback){
	var ele = document.querySelector(path);
	if(ele){
		callback && callback();
	}else{
		console.log('异步加载元素中....' + path );
		setTimeout( function(){checkElementState(path,callback);},200);
	}
}





//提交订单
function preBuy(){
	
	console.log('提交订单开始....');
	
	checkElementState('.product-button02',function(){
		var btn = document.querySelectorAll(".product-button02")[2];
		btn.style.backgroundColor = "green";
	
		if(btn){
			btn.click();
		}else{
			console.log('提交订单按钮没找到');
		}
			
	});
}

//确定订单，进入结算
function submitOrder(){
	
	console.log('提交订单开始....');
	
	checkElementState('.order-submit-btn',function(){
		var btn = document.querySelector(".order-submit-btn");
	
		if(btn){
			btn.click();
		}else{
			console.log('提交订单按钮没找到');
		}
			
	});
}


//购物车页面，进入结算
function cartbuy(){
	
	console.log('购物车提交订单开始....');
	
	var btn = document.querySelector(".order-submit-btn");
	if(btn){
		btn.click();
	}else{
		location.reload();
	}
	
}

//付款
function buy(){
	
	console.log('付款开始....');
	
	checkElementState('.confirmPay',function(){
		var btn = document.querySelector(".confirmPay");
	
		if(btn){
			btn.click();
		}else{
			console.log('付款按钮没找到');
		}
			
	});
}



//目标时间
	var dDate = new Date();  //10点和20点开抢
	if( dDate.getHours() < 11 ){
		dDate.setHours(10,07,59.8);
	}else{
		dDate.setHours(18,01,59.8);
	}
	
	//dDate.setSeconds( dDate.getSeconds() + 10 );
	
//进入时间判断循环
function enterTimeCheckLoop(callback){
	var date = new Date();
	
	var diff = dDate.getTime() - date.getTime();

	// diff = 1400;//测试时使用，正式版需要注释掉1
	
	console.log(diff);
	
	if(diff < - 1000 ){
		
		console.log('时间过了！');

		callback && callback();
		
		setTimeout(function(){ enterTimeCheckLoop(callback);},5000);
		
	}else if(diff < 500 ) {

		callback && callback();
		
		console.log('时间到了！！！');
		
	}else if(diff < 1500 ) {

		window.open(location.href);

		setTimeout(function(){ enterTimeCheckLoop(callback);},1);
		
		console.log('打开新标签页，本页继续抢！！！');
		
	}else{
		setTimeout(function(){ enterTimeCheckLoop(callback);},400);
		
		console.log('--');
	}
	
	
	
}


//主要函数
function main(){
	console.log('############################开始抢购mate40 pro############################');
	
	//debugger;
	
	var href = window.location.href;
	if(href.indexOf('www.vmall.com/order/') > -1 ){
		
		//提交订单页面
		console.log('提交订单！！！！！');
		enterTimeCheckLoop(submitOrder );
	}else if(href.indexOf('www.vmall.com/product/') > -1 ){
		//进入时间判断
		console.log('倒计时！！！！！');
		console.log('倒计时！！！！！');
		console.log('倒计时！！！！！');
		console.log('倒计时！！！！！');
		
		//添加点击事件
		checkElementState('.product-button02',function(){
			var btn = document.querySelectorAll(".product-button02")[2];
			btn.style.backgroundColor = "yellow";	
			btn.setAttribute("onclick", "rush.business.clickBtn(1);");
			// btn.value='enable';
			btn.setAttribute("class", "product-button02");
		});	
		
		//点击申购
		enterTimeCheckLoop(preBuy );
	}else if(href.indexOf('payment.vmall.com') > -1 ){
		//立即页面
		console.log('付款！！！！！');
		buy();
	}else if(href.indexOf('www.vmall.com/cart2') > -1 ){
		//立即页面
		console.log('购物车提交！！！！！');
		cartbuy();
	}
	
	
}


main();