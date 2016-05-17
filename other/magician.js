//Magician
function Magician(game, spritesheet, spritesheet2) {
	//this.animation = new Animation(spritesheet, 64, 64, 4, 0.15, 16, true, false);
    this.animation = new Animation(spritesheet, 0, 0, 64, 64, 4, 0.15, 16, true);
    this.upAnimation = new Animation(spritesheet, 0, 256, 64, 64, 4, 0.15, 16, true);
    this.leftAnimation = new Animation(spritesheet, 256, 0, 64, 64, 4, 0.15, 16, true);
    this.rightAnimation = new Animation(spritesheet2, 0, 0, 64, 64, 4, 0.15, 16, true);
    this.attackAnimation = new Animation(spritesheet, 256, 256, 64, 64, 4, 0.15, 16, false);
    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
    this.space = false;
    this.move = false;
    this.xPosition = 500;
    this.yPosition = 740;
    Entity.call(this, game, this.xPosition, this.yPosition);//position where it start
}

Magician.prototype = new Entity();
Magician.prototype.constructor = Magician;

Magician.prototype.update = function () {
	//checking which key board is click
	if (this.game.w) {
		this.change("up");
		console.log("yes");
	}
	if (this.game.s) {
		this.change("down");
		console.log("yes");
	}
	if (this.game.a) {
		this.change("left");
		console.log("yes");
	}
	if (this.game.d) {
		this.change("right");
		console.log("yes");
	}
	if (this.game.space) {
		this.change("space");
		console.log("yes");
	}
	//move the character
    if (this.up) {
        if(this.move) {
	        this.yPosition -= 15;
	        if(this.yPosition <= 0) {
	        	this.yPosition = 0;
	        }
	        this.move = false;
        }
        this.y = this.yPosition;
    } else if(this.down) {
    	if(this.move) {
	        this.yPosition += 15;
	        if(this.yPosition >= 645) {
	        	this.yPosition = 645;
	        }
	        this.move = false;
        }
        this.y = this.yPosition;
    } else if(this.right) {
    	if(this.move) {
	        this.xPosition += 15;
	        if(this.xPosition >= 750) {
	        	this.xPosition = 750;
	        }
	        this.move = false;
        }
        this.x = this.xPosition;
    } else if(this.left) {
    	if(this.move) {
	        this.xPosition -= 15;
	        if(this.xPosition <= 0) {
	        	this.xPosition = 0;
	        }
	        this.move = false;
        }
        this.x = this.xPosition;
    } else if(this.space) {
    	if (this.attackAnimation.isDone()) {
            this.attackAnimation.elapsedTime = 0;
            this.space = false;
        }
    }
    
    Entity.prototype.update.call(this);
}

//a helper method for update on which dirction it should face.
Magician.prototype.change = function(dir) {
	switch(dir) {
		case "up": this.up = true; this.down = false; this.left = false; this.right = false; this.space = false; break;
		case "down": this.up = false; this.down = true; this.left = false; this.right = false; this.space = false; break;
		case "left": this.up = false; this.down = false; this.left = true; this.right = false; this.space = false; break;
		case "right": this.up = false; this.down = false; this.left = false; this.right = true; this.space = false; break;
		case "space": this.up = false; this.down = false; this.left = false; this.right = false; this.space = true; break;
		default: console.log("none");
	}
	this.move = true;
}

Magician.prototype.draw = function (ctx) {
	//console.log(this.up);
	if (this.up) {
        this.upAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if(this.down) {
    	this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if(this.left) {
    	this.leftAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if(this.right) {
    	this.rightAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else if(this.space) {
    	this.attackAnimation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    } else {
        this.animation.drawFrame(this.game.clockTick, ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}