'use strict';	

function Display2(buttons,upgrades, sprite){
	
	this.Buttons = buttons;
	this.upgrades = upgrades;
	
	if(sprite){
		this.sprites = sprite;
	}
	this.animationFrame = 0;
	this.animationCurrentTime = 0;
}

Display2.prototype.Buttons = undefined;
Display2.prototype.upgrades = undefined;
Display2.prototype.coconuts = [];
Display2.prototype.showArrow = false;

Display2.prototype.sprites = undefined;



Display2.prototype.render = function(currency, score, isFriend, upgrades){
	//g_ctx.aglobalAlpha = 0.0;
	//g_ctx.fillStyle = 'tranparent';
	//
	g_ctx.clearRect(0,0,g_canvasW,g_canvasH);
	g_ctx.fillStyle = 'rgba(0, 0, 0, 0.0)';
	//this.drawAt(g_ctx, islandPos.x, islandPos.y);


	for(var i = 0; i<this.Buttons.length; i++){

		if(this.Buttons[i].image.name !== "downLvl"){
			this.Buttons[i].render();
		}else if(this.showArrow){
			this.Buttons[i].render();
		}
	}


	for(i = 0; i<this.coconuts.length; i++){
		this.coconuts[i].render();
	}

	var x = 20;
	var y = g_canvasH*0.8;
	var pos1 = {
		x: x,
		y: y
	};

	var pos2 = {
		x: x,
		y: y+25
	};

	if (isFriend) {

	var font = "bold 20px Arial";

	g_ctx.fillStyle = "white";
	g_ctx.font=font;

	if(currency >= 1000 && currency < 1000000){
			currency = (currency / 1000).toFixed(2);
			g_ctx.fillText('Coconuts :  '+currency+'K',pos1.x,pos1.y);

		}else if(currency >= 1000000){
			currency = (currency / 1000000).toFixed(2);
			g_ctx.fillText('Coconuts :  '+currency+'M',pos1.x,pos1.y);
		}else{

			g_ctx.fillText('Coconuts :  '+currency,pos1.x,pos1.y);
		}
	

	g_ctx.font=font;
	g_ctx.fillText('Score : '+score,pos2.x,pos2.y);

	}

	//implements plz
};

Display2.prototype.renderSprites = function(upgrades){
	var flag = true;

	for(var i = 0; i < 3; i++){
		for(var j = 2; j > -1; j-- ){
			
			if(upgrades[j][i] === 2){

				if(i === 0){
					this.sprites[i][j+1].draw(this.sprites[i][j+1].CurrentFrame);
				}else{

					this.sprites[i][j].draw(this.sprites[i][j].CurrentFrame);
				}
				
				flag = false;
				i++;
				j = 3;
				
			}
		}
	}

	if(flag){
		this.sprites[0][0].draw(this.sprites[0][0].CurrentFrame);
	}
};

Display2.prototype.destroyCoconuts = function(){
	this.coconuts = [];
};

Display2.prototype.createCoconut = function(coconut){
		this.coconuts.push(coconut);

};

Display2.prototype.update = function(dt){
	if(this.coconuts){
		for(var i = 0; i<this.coconuts.length; i++){
			var kill = this.coconuts[i].update(dt);
			if(kill === -1){
				this.coconuts.splice(i,1);
			}

		}
	}

	if(this.sprites){
		this.sprites[0][0].update(dt);
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){
				if(i === 0){

					this.sprites[i][j+1].update(dt);
				}else{
					this.sprites[i][j].update(dt);
				}
			}	
		}
	}
};


//var counter = 0;
Display2.prototype.renderUpgrades = function(upgrades, prices){

	for(var i = 0; i < 3; i++){
		for(var j = 0; j < 3; j++){	
			//num++;
			if(upgrades[i][j] === 0){
				this.drawUpgrade(g_ctx,this.upgrades[1][i][j].image, this.upgrades[1][i][j].getPosition().x, this.upgrades[1][i][j].getPosition().y, 0.2);
			}else if(upgrades[i][j] === 1){
				this.drawUpgrade(g_ctx,this.upgrades[0][i][j].image, this.upgrades[0][i][j].getPosition().x, this.upgrades[0][i][j].getPosition().y, 1.0, prices[i][j]);
			}else if(upgrades[i][j] === 2){
				this.drawUpgrade(g_ctx,this.upgrades[2][i][j].image, this.upgrades[2][i][j].getPosition().x, this.upgrades[2][i][j].getPosition().y, 0.3);
			}
		}
	}
};

Display2.prototype.drawUpgrade = function(ctx, image, x, y, transparent, price){
	
	//ctx.globalCompositeOperation = "lighter";
	ctx.beginPath();
	ctx.globalAlpha = transparent;
	ctx.drawImage(image, x, y);

	//draw rectangle around the image
	ctx.beginPath();
	ctx.rect(x, y, image.width, image.height);
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 4;
	if(price){
		var font = "bold 20px Arial";

		g_ctx.fillStyle = "white";
		g_ctx.font=font;
		if(price >= 1000 && price < 1000000){
			price = price / 1000;
			g_ctx.fillText(price+'K',x+15,y+80);

		}else if(price >= 1000000){
			price = price / 1000000;
			g_ctx.fillText(price+'M',x+15,y+80);
		}else{

			g_ctx.fillText(price,x+15,y+80);
		}

	}
	ctx.stroke();

	//reset alpha value
	ctx.globalAlpha = 1.0;
};


Display2.prototype.findButtonForClick = function(e,upgrades){

	var mouseX = e.pageX - $('#myCanvas').offset().left;
	var mouseY = e.pageY - $('#myCanvas').offset().top;

	for (var i = 0; i < this.Buttons.length; i++) {
		
		var cords = this.Buttons[i].getPosition();
		if(cords.x <= mouseX && mouseX <= cords.x+cords.width && cords.y <= mouseY && mouseY <= cords.y+cords.height){
			this.Buttons[i].action();
		}
	}


	if(this.upgrades){
		for(var i = 0; i < 3; i++){
			for(var j = 0; j < 3; j++){	

				if(upgrades[i][j] === 1){
					var cords = this.upgrades[0][i][j].getPosition();
					if(cords.x <= mouseX && mouseX <= cords.x+cords.width && cords.y <= mouseY && mouseY <= cords.y+cords.height){
						var index = [i,j];
						this.upgrades[0][i][j].action(index);
					}
				}
			
			}
		}
		
	}
	//til að taka bara takkana sem er hægt að kaupa (fyrir upgrade menu)
};