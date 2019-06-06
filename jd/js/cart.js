window.addEventListener('load',()=>{
	deleteProduct();
});
function deleteProduct(){
	//1.获取需要的元素
	let pannel  = document.getElementsByClassName('pannel')[0];
	let pannelConent = pannel.getElementsByClassName('pannel-conent')[0];
	let trashes = document.getElementsByClassName('shop-deal-right');
	let cartCheckBox = document.getElementsByClassName('cart-check-box');	
	//2.监听点击
	let up;//上面的盖子
	for(let i=0;i<trashes.length;i++){
		//调用mjd.tap
		mjd.tap(trashes[i],(e)=>{
			//console.log(trashes[i]);
			//2.2实现垃圾篓的翻盖
			up = trashes[i].firstElementChild;
			//2.3过渡
			up.style.transition = 'all 1s ease';
			up.style.webkitTransition = 'all 1s ease';
			//2.4翻盖动画
			up.style.transformOrigin = '0 0.5rem';
			up.style.webkitTransformOrigin = '0 0.5rem';
			
			up.style.transform = 'rotate(-45deg)';
			up.style.webkitTransform = 'rotate(-45deg)';
			//3.1弹出面板
			pannel.style.display = 'block';
		});
	}
	//3.点击取消按钮
	let cancel = pannelConent.getElementsByClassName('cancel')[0];
	mjd.tap(cancel,()=>{
		pannel.style.display = 'none';
		up.style.transform = 'rotate(0deg)';
		up.style.webkitTransform = 'rotate(0deg)';
	})
	//4.复选框的选中和取消
	for(let i=0;i<cartCheckBox.length;i++){
		mjd.tap(cartCheckBox[i],(e)=>{
			//console.log(e.target);
			if(e.target.hasAttribute('checked')){//判断有checked属性
				e.target.removeAttribute('checked');//删除
			}else{
				e.target.setAttribute('checked','');
			}
			
		})
	}
}
