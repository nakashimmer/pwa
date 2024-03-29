
var CANVAS1 = document.getElementById("canvas1");
var CTX = CANVAS1.getContext("2d");

//1.PC(マウス)で操作
const MOUSE = {x:0,y:0,x1:0,y1:0,color:"black"};
let myDraw = false;
//1-1マウスが動いたら描画
CANVAS1.addEventListener("mousemove",(e)=>{
	CTX.lineWidth = 10;
	CTX.globalAlpha = 1;
	var rect = e.target.getBoundingClientRect();
	MOUSE.x = e.clientX - rect.left;
	MOUSE.y = e.clientY - rect.top;
	CTX.strokeStyle=MOUSE.color;
	
	//1-2ただしmyDrawがtrueの場合のみ
	if(myDraw){
		CTX.beginPath();
		CTX.moveTo(MOUSE.x1,MOUSE.y1);
		CTX.lineTo(MOUSE.x,MOUSE.y);
		CTX.lineCap="round";
		CTX.stroke();
		MOUSE.x1=MOUSE.x;
		MOUSE.y1=MOUSE.y;
	}
});

//1-2.マウスを押している間、描画を許可(myDrawをtrue)
CANVAS1.addEventListener("mousedown",(e)=>{
	myDraw=true;
	MOUSE.x1=MOUSE.x;
	MOUSE.y1=MOUSE.y
});

//1-2.マウスを離すと、描画を禁止(myDrawをfalse)
CANVAS1.addEventListener("mouseup",(e)=>{
	myDraw=false;
});



//2.タッチで操作
const FINGER={x:0,y:0,x1:0,y1:0,color:"black"};
//タッチ開始
CANVAS1.addEventListener("touchstart", (e) => {
	e.preventDefault();
	const rect = e.target.getBoundingClientRect();

	FINGER.x1 = e.touches[0].clientX - rect.left;
	FINGER.y1 = e.touches[0].clientY - rect.top;
	

	
});

//2-2.タッチして動き出したら描画
CANVAS1.addEventListener("touchmove",(e)=>{
	e.preventDefault();
	CTX.lineWidth=10;
	
	const rect = e.target.getBoundingClientRect();

	FINGER.x = e.touches[0].clientX-rect.left;
	FINGER.y = e.touches[0].clientY-rect.top;
	
	CTX.beginPath();
	CTX.moveTo(FINGER.x1, FINGER.y1);
	CTX.lineTo(FINGER.x, FINGER.y);
	CTX.lineCap="round";
	CTX.strokeStyle = FINGER.color;
	CTX.stroke();
	FINGER.x1=FINGER.x;
	FINGER.y1=FINGER.y;
});

CANVAS1.addEventListener("touchend", (e) => {
	CTX.closePath();
});