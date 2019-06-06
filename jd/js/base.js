//封装js
window.mjd = {};
mjd.transitionEnd = (obj,callBack)=>{
	//1.容错
	if(typeof obj !=='object') return;
	obj.addEventListener('transitionEnd',(e)=>{//transitionEnd过度结束
		callBack && callBack(e);//只有外界有回调函数才会执行
	});
	
	obj.addEventListener('webkitTransitionEnd',(e)=>{//transitionEnd过度结束
		callBack && callBack(e);
	});
};


/**********封装tap事件,相当于移动端的click事件 必须 小于200ms***********/
mjd.tap=(obj,callBack)=>{
	//1.起始时间
	let startTime = 0;
	//1.2是否产生移动
	let isMove = false;
	//1.3监听触摸
	obj.addEventListener('touchstart',()=>{
		//1.4获取当前的时间
		startTime = Date.now();
	});
	obj.addEventListener('touchmove',()=>{
		//1.5产生移动
		isMove = true;
	});
	obj.addEventListener('touchend',(e)=>{
		//1.6判断是否为tap事件
		if(Date.now() - startTime < 200 && !isMove){
			callBack && callBack(e);
		}
		//1.7还原事件状态
		startTime = 0;
		isMove = false;
	});
}
