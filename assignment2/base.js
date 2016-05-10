// GameBoard code below

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function Base(game, position) {
    this.player = 1;
    this.side = 50;
    this.health = 10;
    this.isAlive = true;
    //this.visualside = 500;
    this.clockTick = 0;
    this.position = position;
    this.colors = ["Red", "Blue", "Green", "White"];
    switch(position) {
    	case 0: Entity.call(this, game, 0, 400); this.x = 0; this.y = 350; break;
    	case 1: Entity.call(this, game, 800, 400); this.x = 750; this.y = 350; break;
    	case 2: Entity.call(this, game, 400, 800); this.x = 375; this.y = 750; break;
    	case 3: Entity.call(this, game, 400, 0); this.x = 375; this.y = 0; break;
    	default: console.log("something else");
    }
};

Base.prototype = new Entity();
Base.prototype.constructor = Base;

Base.prototype.setColor = function (num) {
	this.color = num;
};

Base.prototype.collide = function (other) {
    return distance(this, other) < this.side + other.radius;
};

Base.prototype.collideLeft = function () {
    return (this.x - this.side) < 0;
};

Base.prototype.collideRight = function () {
    return (this.x + this.side) > 800;
};

Base.prototype.collideTop = function () {
    return (this.y - this.side) < 0;
};

Base.prototype.collideBottom = function () {
    return (this.y + this.side) > 800;
};

Base.prototype.touchCircle = function (circle) {
    if (this.health < 10) {
    	circle.removeFromWorld = true;
    	circle.isAlive = false;
        this.health -= circle.radius / 10;
    }
}
Base.prototype.update = function () {
	
    Entity.prototype.update.call(this);
    //console.log(this.game.clockTick);

    this.clockTick++;
    //console.log(this.clockTick);
    //this.x += this.velocity.x * this.game.clockTick;
    //this.y += this.velocity.y * this.game.clockTick;
    if(this.clockTick > Math.random() * 2500 + 100) {
    	var size = Math.floor(Math.random() * 3 + 1) * 10;
    	//console.log(size);
    	var circle = new Circle(this.game, this.position, size);
    	//console.log("here");
    	//circle.setColor(this.position);
    	this.game.addEntity(circle);
        this.clockTick = 0;
    	//this.lastClockTick = this.game.clockTick;
    }
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        if(ent == this && !this.isAlive) {
        	this.game.entities[i].removeFromWorld = true;
        }
        if (ent !== this && this.collide(ent)) {
        	console.log(this.health);
        	this.touchCircle(ent);
		    if (this.health <= 0) {
		    	this.isAlive = false;
		    }
        }
    }
};

Base.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.colors[this.color];
    //ctx.arc(this.x, this.y, this.side, 0, Math.PI * 2, false);
    ctx.rect(this.x, this.y, this.side, this.side);
    ctx.fill();
    ctx.closePath();

};