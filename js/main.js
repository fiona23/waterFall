window.onload = function(){
	//addimg();
	waterfall("main","box");
	var dataInt = {"data":[{"src":'24.jpg'},{"src":'25.jpg'},{"src":'26.jpg'},{"src":'27.jpg'},{"src":'28.jpg'},{"src":'29.jpg'}]}
	window.onscroll = function(){
		if(checkScrollSlide()){
			var oParent = document.getElementById("main");
			for(var i = 0; i < dataInt.data.length; i++){
				var oBox = document.createElement('div');
				oBox.className = "box";
				oParent.appendChild(oBox);
				var oPic = document.createElement('div')
				oPic.className = "pic";
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "image/"+dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall("main","box");

		}
	}
}

/*function addimg(){
	for(var i=1;i<100; i++){
		$("#main").append("<div class='box'><div class='pic'><img src='image/"+i+".jpg' alt='' /></div></div>")
	}

}*/



function waterfall(parent,box){
	//将main下class为box的元素取出来
	var oParent = document.getElementById(parent)
	var oBox = getByClass(oParent,box);//class为box的元素
	var oBoxWidth = oBox[0].offsetWidth;
	var column = Math.floor(document.body.clientWidth/oBoxWidth);
	oParent.style.cssText = "width:"+oBoxWidth*column+"px;margin:0 auto";
	var heightArr = [];//存放每一列高度
	for(var i = 0; i < oBox.length; i++){
		if(i<column){
			heightArr.push(oBox[i].offsetHeight);
		}else{
			var minHeight = Math.min.apply(null,heightArr);
			var minHeightIndex = getminHeightIndex(minHeight,heightArr);
			oBox[i].style.position = 'absolute'
			oBox[i].style.top = minHeight + 'px';
			oBox[i].style.left = minHeightIndex*oBoxWidth + 'px';
			heightArr[minHeightIndex] = heightArr[minHeightIndex]+oBox[i].offsetHeight	
		}
	
	}
}

//得到parent父元素下面所有class为clsName的子元素
function getByClass(oParent,clsName){
	var boxArr = [];//用来存放class为box的元素的数组
	var	oElement = oParent.getElementsByTagName('*');
	for(var i = 0; i < oElement.length; i++){
		if(oElement[i].className === clsName){
			boxArr.push(oElement[i]);
		}
	}
	return boxArr;
}

function getminHeightIndex(oHeight,arry){
	for(var i = 0; i < arry.length; i++){
		if(oHeight === arry[i]){
			return i;
		}
	}
}

function checkScrollSlide(){
	var oParent = document.getElementById("main")
	var oBox = getByClass(oParent,"box");
	var loadHeight = oBox[oBox.length-1].offsetTop+Math.floor(oBox[oBox.length-1].offsetHeight/2);//最后一张图片与最顶端的距离+自己的一半
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;//滑块滚动距离
	var viewHeight = document.body.clientHeight || document.documentElement.clientHeight;//浏览器窗口高度
	return (loadHeight<=scrollTop+viewHeight)?true:false;
		console.log(loadHeight);
	console.log(scrollTop);
	console.log(viewHeight);
	

}
