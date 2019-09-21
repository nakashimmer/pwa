
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
		
		//1-2.マウスを話すと、描画を禁止(myDrawをfalse)
		CANVAS1.addEventListener("mouseup",(e)=>{
			myDraw=false;
		});

		//2.タッチで操作
		const FINGER=new Array;
		for(let i=0;i<10;i++){
			FINGER[i]={
				x:0,y:0,x1:0,y1:0,
				color:"rgb("
					+Math.floor(Math.random()*16)*15+","
					+Math.floor(Math.random()*16)*15+","
					+Math.floor(Math.random()*16)*15
					+")"
			};
		}

		//2-1.タッチした瞬間座標を取得
		CANVAS1.addEventListener("touchstart",(e)=>{
			e.preventDefault();
			const rect = e.target.getBoundingClientRect();
			for(let i=0;i<FINGER.length;i++){
				FINGER[i].x1 = e.touches[i].clientX-rect.left;
				FINGER[i].y1 = e.touches[i].clientY-rect.top;
			}
		});

		//2-2.タッチして動き出したら描画
		CANVAS1.addEventListener("touchmove",(e)=>{
			e.preventDefault();
			CTX.lineWidth=document.getElementById("lineWidth").value;
			const rect = e.target.getBoundingClientRect();
			for(let i=0;i<FINGER.length;i++){
				FINGER[i].x = e.touches[i].clientX-rect.left;
				FINGER[i].y = e.touches[i].clientY-rect.top;
				CTX.strokeStyle=FINGER[i].color;
				CTX.beginPath();
				CTX.moveTo(FINGER[i].x1,FINGER[i].y1);
				CTX.lineTo(FINGER[i].x,FINGER[i].y);
				CTX.lineCap="round";
				CTX.stroke();
				FINGER[i].x1=FINGER[i].x;
				FINGER[i].y1=FINGER[i].y;
			}
		});