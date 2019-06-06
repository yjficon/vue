window.addEventListener('load',()=>{
    carousel()//轮播图
    changeNavBarColor()//改变导航条背景
    secondKill()//秒杀倒计时
});
//屏幕大小改变时自动适应，在真机使用时是不需要的
let timer = null;
window.addEventListener('resize',()=>{
	//console.log(111);
	 clearTimeout(timer);//清除定时器 
	 timer = setTimeout(()=>{//节流
		window.location.reload();
	},50)
	
})
//轮播图
function carousel(){
	//获取需要的标签
	let banner = document.getElementsByClassName('jd-banner')[0];
	let bannerW = banner.offsetWidth;
	let imageBox = banner.getElementsByTagName('ul')[0];//图片的盒子
	let indicatorBox = banner.getElementsByTagName('ol')[0];//指示器的 盒子
	let allPoints = indicatorBox.getElementsByTagName('li');//所有的原点
	//2.设置过渡效果 清除过渡效果 位置的改变
	let addTransition = ()=>{//针对imageBox 来改变图片的过渡效果
		imageBox.style.transition = 'all .2s';
		imageBox.style.webkitTransition = 'all .2s';//手机加兼容
	};
	let removeTransition = ()=>{//针对imageBox 来改变图片的过渡效果
		imageBox.style.transition = 'none';
		imageBox.style.webkitTransition = 'none';//手机加兼容
	};
	let changeTranslateX = (x)=>{
		imageBox.style.transform =  'translateX('+ x +'px)';
		imageBox.style.webkitTransform =  'translateX('+ x +'px)';
	}
	let autoPlay = ()=>{
		index++;
		//设置过渡效果
		addTransition();
		//改变位置
		changeTranslateX(-index*bannerW);
		//console.log(-index*bannerW);
		
	}
	//3.让图片盒子滚起来
	let index =  1;//全局索引
	let timer = null;//定时器
	timer = setInterval(autoPlay,1000);
	//4.过渡结束时 监听图片盒子临界值
	mjd.transitionEnd(imageBox,()=>{
		//4.1判断最大索引和最小索引
		if(index>=9){
			//最大值 
			index=1;
		}else if(index<=0){
			index=8;
		}
		//4.2清除过渡
		removeTransition();
		changeTranslateX(-index*bannerW);
		//4.3指示器
		changePoint();
	})
	/*imageBox.addEventListener('transitionEnd',()=>{//transitionEnd过度结束
		//4.1判断最大索引和最小索引
		if(index>=9){
			//最大值 
			index=1;
		}else if(index<=0){
			index=8;
		}
		//4.2清除过渡
		removeTransition();
		changeTranslateX(-index*bannerW);
		//4.3指示器
		changePoint();
	})
	imageBox.addEventListener('webkitTransitionEnd',()=>{//transitionEnd过度结束
		
		//4.1判断最大索引和最小索引
		if(index>=9){
			//最大值 
			index=1;
		}else if(index<=0){
			index=8;
		}
		//4.2清除过渡
		removeTransition();
		changeTranslateX(-index*bannerW);
		//4.3指示器
		changePoint();
	});
	*/
	//5.指示器处理
	let changePoint=()=>{
		for(let i=0; i<allPoints.length;i++){
			allPoints[i].className='';
		}
		//5.1索引保持一致
		let pointIndex=index;
		if(pointIndex>=9){
			pointIndex=1;
		}else if(pointIndex<=0){
			pointIndex=8;
		}
		allPoints[pointIndex-1].className='current';
	}
	
	//6.监听手势滑动
	let startX= 0;//起始触摸
	let endX = 0;//结束触摸
	let distanceX = 0;//滑动的距离
	imageBox.addEventListener('touchstart', (e)=>{
         // 6.1 清除定时器
        clearInterval(timer);
         //console.log(e.touches);
        startX = e.touches[0].clientX;
    });
    imageBox.addEventListener('touchmove', (e)=>{
         //console.log(e.touches);
        endX = e.touches[0].clientX;
        //6.2移动的距离
        distanceX=startX-endX;
        //console.log(distanceX)
        //6.3然盒子走起来
        removeEventListener();
        changeTranslateX(-index*bannerW-distanceX);
    });
    imageBox.addEventListener('touchend', (e)=>{
    	//判断拖动的距离是否超过1/3，必须处在滑动状态
    	if(Math.abs(distanceX)>1/3*bannerW && endX!==0){
    		//判断
    		if(distanceX>0){
    			index++;
    		}else if(distanceX<0){
    			index--;
    		}
    	}
    	//添加过渡效果
    	addTransition();
    	//改变位置
    	changeTranslateX(-index*bannerW);
    	//开启定时器
    	timer = setInterval(autoPlay,1000);
    	//清除记录值
    	startX = 0;
    	endX = 0;
    	distanceX = 0;
    });
}
//改变导航条的颜色
function changeNavBarColor(){
	//console.log(222)
	//1.获取需要的标签
	let headerBox =  document.getElementsByClassName('jd-header-box')[0];
	let banner = document.getElementsByClassName('jd-banner')[0];
	//2.求出焦点图的高度
	let bannerH = banner.offsetHeight,
	    scrollTopH = 0;
	//console.log(bannerH);
	//3.监听页面的滚动
	window.addEventListener('scroll',()=>{
		//3.1求出页面偏离头部的高度
		scrollTopH = document.documentElement.scrollTop
		//console.log(scrollTopH )
		//3.2判断bannerH与scrollTopH的大小
		let opt = 0;
		if(scrollTopH <= bannerH){
			//3.3求出透明度
			opt =  scrollTopH  / bannerH * 0.85;
		}else{
			opt = 0.85;
			 
		}
		//console.log(opt)
		//3.4设置颜色的渐变
		headerBox.style.backgroundColor=`rgb(228, 49, 48,${opt})`;
	})
}
//秒杀倒计时
function secondKill(){
	//1.获取需要的标签
	let sKillTime = document.getElementsByClassName('s-kill-time')[0];
	let spans = sKillTime.getElementsByTagName('span');
	sKillTime.style.display = 'block';
	//2.设置定时器
	let timer =  null,
	time = 18 * 60 * 60;
	timer = setInterval(()=>{
		time--;
		//21.判断
		if(time<=0){
			clearInterval(timer);
		}
		//2.2拆分时分秒
		let h = Math.floor(time / (60*60));
		let m = Math.floor(time % (60*60)/60); 
		let s = time % 60;
		//console.log(h,m,s);
		//2.3把内容显示在页面上
		spans[0].innerHTML = h >= 10 ? Math.floor(h/10) : 0;
		spans[1].innerHTML = h % 10;
		spans[3].innerHTML = m >= 10 ? Math.floor(m/10) : 0;
		spans[4].innerHTML = m % 10;
		spans[6].innerHTML = s >= 10 ? Math.floor(s/10) : 0;
		spans[7].innerHTML = s % 10;
	},1000)
	
}
