
Button2.prototype.topX = undefined;
Button2.prototype.topY = undefined;
Button2.prototype.image = undefined;
Button2.prototype.actionFunc = undefined;
Button2.prototype.height = undefined;
Button2.prototype.width = undefined;

function Button2(pos, img, actionFunc){

	this.topX = pos.topX;
	this.topY = pos.topY;
	this.height = pos.height;
	this.width = pos.width;
	this.image = img;
	this.actionFunc = actionFunc;
}

Button2.prototype.render = function(){
	this.drawAt(g_ctx, this.topX, this.topY,this.width, this.height);
	//implement plz
};

Button2.prototype.action = function(i){
	
	if(this.actionFunc){

		this.actionFunc(i);
	}

};

Button2.prototype.getPosition = function(){
	return {x: this.topX,
			y: this.topY,
			width: this.width,
			height: this.height};
};

Button2.prototype.getImage = function(){
	return this.image;
};

Button2.prototype.getAudioPath = function(){
	//implement plz
};

Button2.prototype.drawAt = function (ctx, x, y, w, h) {
	ctx.drawImage(this.image, x, y, w, h);
};