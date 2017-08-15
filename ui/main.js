console.log('Loaded!');
var img=document.getElementById("image");
var marginLeft=0;
function moveRight()
{	if(marginLeft<1000)
	{
		marginLeft=marginLeft+1;
		img.style.marginLeft=marginLeft+'px';
	}
}
img.onclick= function()
{
	var interval=setInterval(moveRight,5);
}