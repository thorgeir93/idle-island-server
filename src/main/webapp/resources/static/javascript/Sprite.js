function Sprite(sheet,frameHeight,frameWidth,cx,cy, animationTime, frames, scale, shouldaAnimate) {

    this.spriteSheet = sheet;
    this.frameHeight = frameHeight;
    this.frameWidth = frameWidth;
    this.cx = cx;
    this.cy = cy;
    this.shouldAnimate = shouldaAnimate;
    this.animationTime = animationTime;
    this.animationFrames = frames;
    this.scale = scale;
    this.CurrentFrame = 0;
    this.CurrentTime = 0;
}

Sprite.prototype.frameHeight = undefined;
Sprite.prototype.frameWidth = undefined;

Sprite.prototype.spriteSheet = undefined;
Sprite.prototype.animationTime = undefined;

Sprite.prototype.cx = undefined;
Sprite.prototype.cy = undefined;

Sprite.prototype.shouldAnimate = undefined;

Sprite.prototype.animationFrames = undefined;
Sprite.prototype.scale = undefined;

Sprite.prototype.CurrentFrame = undefined;

Sprite.prototype.CurrentTime = undefined;




Sprite.prototype.draw = function(frame){
    if(this.shouldAnimate){


        g_ctx.drawImage(this.spriteSheet, this.frameWidth*frame, 0, this.frameWidth, this.frameHeight, this.cx, this.cy, this.frameWidth*this.scale, this.frameHeight*this.scale);
    

    }else{
        g_ctx.drawImage(this.spriteSheet, this.frameWidth*0, 0, this.frameWidth, this.frameHeight, this.cx, this.cy, this.frameWidth*this.scale, this.frameHeight*this.scale);
    }
};

Sprite.prototype.update = function(dt){
    this.CurrentFrame = Math.floor(this.CurrentTime/ (this.animationTime / this.animationFrames));
    
    if(this.shouldAnimate){

        this.CurrentTime += dt/1000;
    }

    if(this.CurrentTime > this.animationTime ){
        this.CurrentTime = 0;
        if(this.spriteSheet.name === 'kall' || this.spriteSheet.name === 'kall1' || this.spriteSheet.name === 'kall2' ||this.spriteSheet.name === 'kall3'||this.spriteSheet.name === 'molekall'){

            this.shouldAnimate = false;
        }
    }
};
