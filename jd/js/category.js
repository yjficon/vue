window.addEventListener('load',()=>{
	leftCategory();
});
//左边
let leftCategory = ()=>{
	//1.获取需要的标签
	let parentDom = document.getElementsByClassName('category-main-left')[0];//console.log(parentDom)
	let childDom = parentDom.getElementsByClassName('category-main-left-con')[0];
	//2.求出父标签和子标签的高度
	let parentH = parentDom.offsetHeight / 10;
	let childH = childDom.offsetHeight / 10;
	//console.log(parentH,childH);
	//3.确定合理的缓冲区间
	let buffer = 15;
	//确定最大的合理滚动区间
	let maxY =  0; //最大的
	let minY = -(childH-parentH); //最小的
	//4.设置过渡 清除过渡 改变位置
	
	let addTransition = ()=>{//设置过渡
		childDom.style.transition = 'all .2s ease';
		childDom.style.webkitTransition = 'all .2s ease';
	};
	let removeTransition = ()=>{//清除过渡
		childDom.style.transition = '';
		childDom.style.webkitTransition = '';
	};
	let changeTranslateY = (Y)=>{//改变位置
		childDom.style.transform = `translateY(${Y}rem)`;
		childDom.style.webkitTransform = `translateY(${Y}rem)`;
	};
	/*5.滑动起来
	 * startY = 0 //开始的距离
	 * endY = 0 // 结束的距离
	  moveY = 0//移动的距离
	 currentY = 0;//时刻记录当前的位置
	 * */
	let startY = 0 , endY = 0 ,moveY = 0, currentY = 0;
	//5.1开始触碰
	childDom.addEventListener('touchstart',(e)=>{
		//1.起始位置
		startY = e.touches[0].clientY / 10;//clientY 事件属性返回当事件被触发时鼠标指针向对于浏览器页面（客户区）的垂直坐标
	});
	//5.2开始移动
	childDom.addEventListener('touchmove',(e)=>{
		//1.起始位置
		endY = e.touches[0].clientY / 10;
		//计算移动的距离
		moveY = startY - endY;
		//console.log(currentY-moveY);
		//移动起来
		//确定在合理的滚动区间		
		if(currentY-moveY < (maxY + buffer) && currentY-moveY > (minY - buffer)){
			removeTransition();
		    changeTranslateY(currentY-moveY);
		}
	});
	//5.3结束触碰
	childDom.addEventListener('touchend',(e)=>{
		//判断是否在合理的范围内
		if(currentY - moveY >  maxY){
			currentY = maxY;
			//添加过渡，改变位置
			addTransition();
			changeTranslateY(currentY);
		}else if(currentY - moveY < minY){
			currentY = minY;
			addTransition();
			changeTranslateY(currentY);
		}else{//正常
			currentY = currentY - moveY;
		}
		//清除值
		startY = 0;
		endY = 0;
		moveY = 0;
	});
	//6.监听li的Tap事件
	let liList = childDom.getElementsByTagName('li');
	mjd.tap(childDom,(e)=>{
		//6.1清除所有li标签上的class
		for(let i=0; i<liList.length;  i++){
			liList[i].className = '';
			liList[i].index = i;
		}
		//6.2让当前点击的li被选中
		let li = e.target.parentNode;//点击事件 的事件源
		li.className = 'current';
		//console.log(li) 作用于a标签上 .parentNode将其作用于li标签上
		//6.3求出滚动距离
		let distanceY = -(li.index * 4.4);
		//6.4让ul在合理的范围内滚动
		if(distanceY > minY){
			addTransition();
			changeTranslateY(distanceY);
			currentY = distanceY;
		}else{
			changeTranslateY(minY);
			currentY = minY;
		}
		//6.5模拟数据的加载
		let rightDom = document.getElementsByClassName('category-main-right')[0];
		rightDom.style.opacity = 0;
		rightDom.style.transition = 'all .3s ease';
		rightDom.style.webkitTransition = 'all .3s ease';
		setTimeout(()=>{
			rightDom.style.opacity = 1;
		},300)
	});
}
