
function Coconut(pos, img, audio){

	this.topX = pos.topX;
	this.topY = pos.topY;
	this.height = pos.height;
	this.width = pos.width;
	this.image = img;
	this.audio = audio;
	if(Math.random()>0.5){

		this.Xvel = Math.random()*10;
	}else{
		this.Xvel = -Math.random()*10;
	}
	this.Yvel = (-Math.random() * 20)+10;

}

Coconut.prototype.topX = undefined;
Coconut.prototype.topY = undefined;
Coconut.prototype.image = undefined;
Coconut.prototype.audio = undefined;
Coconut.prototype.height = undefined;
Coconut.prototype.width = undefined;
Coconut.prototype.Xvel = undefined;
Coconut.prototype.Yvel = undefined;
Coconut.prototype.time = 20;

Coconut.prototype.render = function(){
	
	this.drawAt(g_ctx, this.topX, this.topY,this.width, this.height);
	//implement plz
};

Coconut.prototype.update = function(dt){
	this.topX += (dt/100)*this.Xvel;
	this.topY += (dt/100)*this.Yvel;

	this.Yvel += (dt/100)*9.8;

	//controls the heigth that coconut
	//have to travel
	if(this.topY > g_canvasH*0.78){
		this.Yvel = -this.Yvel*0.5;
		this.topY -= 5;
	}

	this.time -= (dt/100);
	if(this.time < 0){
		return -1;
	}
};

Coconut.prototype.getPosition = function(){
	return {x: this.topX,
			y: this.topY,
			width: this.width,
			height: this.height};
};

Coconut.prototype.getImage = function(){
	return this.image;
};

Coconut.prototype.getAudioPath = function(){
	//implement plz
};

Coconut.prototype.drawAt = function (ctx, x, y, w, h) {

	if(this.time < 10){
		
		ctx.globalAlpha = 1/(10 - this.time);
	}
	ctx.drawImage(this.image, x, y, w, h);
    //ctx.drawImage(this.image,
                  //x, y);

	ctx.globalAlpha = 1;
};
