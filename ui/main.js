console.log('Loaded!');
var img=document.getElementById("image");
var marginLeft=0;
function moveRight()
{	if(marginLeft<1000)
	{
		marginLeft=marginLeft+1;
		img.style.marginLeft=marginLeft+'px';
	}
};
img.onclick= function()
{
	var interval=setInterval(moveRight,5);
};


var button=document.getElementById('counter');
button.onclick=function(){

	var request=new XMLHttpRequest();
	request.onreadystatechange=function(){
		if(request.readyState===XMLHttpRequest.DONE)
		{
			if(request.status===200)
			{
				var cnt=request.responseText;
				var span=document.getElementById('count');
				span.innerHTML=cnt.toString();
			}
		}
	};
	request.open('GET','http://localhost:2345/counter',true);
	request.send(null);
};

var submit=document.getElementById('sub_btn');
submit.onclick= function(){

	var request=new XMLHttpRequest();
	request.onreadystatechange=function(){
		if(request.readyState===XMLHttpRequest.DONE)
		{
			if(request.status===200)
			{
				var list=``;
				var names=request.responseText;
				names=JSON.parse(names);
				for(var i=0;i<names.length;i++){
				list=list+'<li>' +names[i]+'</li>';
				}
			}
			ul=document.getElementById('name_list');
			ul.innerHTML=list;
		}
	};
		var nameInput=document.getElementById('name');
	var name=nameInput.value;
	request.open('GET','http://localhost:2345/submit-name?name='+name,true);
	request.send(null);
};