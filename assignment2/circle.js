// GameBoard code below

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

function Circle(game, team, radius) {
    this.player = 1;
    this.radius = radius;
    this.visualRadius = 500;
    this.colors = ["Red", "Blue", "Green", "White"];
    this.isAlive = true;
    //this.setNotIt();
    this.setColor(team);
    switch(team) {
		case 0: Entity.call(this, game, 0, 400); this.x = 0; this.y = 350; break;
		case 1: Entity.call(this, game, 800, 400); this.x = 750; this.y = 350; break;
		case 2: Entity.call(this, game, 400, 800); this.x = 375; this.y = 750; break;
		case 3: Entity.call(this, game, 400, 0); this.x = 375; this.y = 0; break;
		default: console.log("something else");
    }	

    //how fast it is going
    this.velocity = { x: Math.random() * 300, y: Math.random() * 300 };
    var speed = Math.sqrt(this.velocity.x * this.velocity.x + this.velocity.y * this.velocity.y);
    if (speed > maxSpeed) {
        var ratio = maxSpeed / speed;
        this.velocity.x *= ratio;
        this.velocity.y *= ratio;
    }
};

Circle.prototype = new Entity();
Circle.prototype.constructor = Circle;

Circle.prototype.setColor = function (num) {
	this.color = num;
};

Circle.prototype.setIt = function () {
    this.it = true;
    this.color = 0;
    this.visualRadius = 500;
};

Circle.prototype.setNotIt = function () {
    this.it = false;
    this.color = 3;
    this.visualRadius = 200;
};

Circle.prototype.collide = function (other) {
    return distance(this, other) < this.radius + other.radius;
};

Circle.prototype.collideLeft = function () {
    return (this.x - this.radius) < 0;
};

Circle.prototype.collideRight = function () {
    return (this.x + this.radius) > 800;
};

Circle.prototype.collideTop = function () {
    return (this.y - this.radius) < 0;
};

Circle.prototype.collideBottom = function () {
    return (this.y + this.radius) > 800;
};

Circle.prototype.update = function () {
    Entity.prototype.update.call(this);
   //console.log(this.game.clockTick);

    this.x += this.velocity.x * this.game.clockTick;
    this.y += this.velocity.y * this.game.clockTick;

    //left and right wall
    if (this.collideLeft() || this.collideRight()) {
        this.velocity.x = -this.velocity.x * friction;
        if (this.collideLeft()) this.x = this.radius;
        if (this.collideRight()) this.x = 800 - this.radius;
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
    }

    //top and bottom wall
    if (this.collideTop() || this.collideBottom()) {
        this.velocity.y = -this.velocity.y * friction;
        if (this.collideTop()) this.y = this.radius;
        if (this.collideBottom()) this.y = 800 - this.radius;
        this.x += this.velocity.x * this.game.clockTick;
        this.y += this.velocity.y * this.game.clockTick;
    }

    //other circle
    for (var i = 0; i < this.game.entities.length; i++) {
        var ent = this.game.entities[i];
        
        if(ent == this && !this.isAlive) {
        	this.game.entities[i].removeFromWorld = true;
        }
        if (ent !== this && this.collide(ent)) {
            var temp = { x: this.velocity.x, y: this.velocity.y };

            var dist = distance(this, ent);
            var delta = this.radius + ent.radius - dist;
            var difX = (this.x - ent.x)/dist;
            var difY = (this.y - ent.y)/dist;

            this.x += difX * delta / 2;
            this.y += difY * delta / 2;
            ent.x -= difX * delta / 2;
            ent.y -= difY * delta / 2;

            this.velocity.x = ent.velocity.x * friction;
            this.velocity.y = ent.velocity.y * friction;
            ent.velocity.x = temp.x * friction;
            ent.velocity.y = temp.y * friction;
            this.x += this.velocity.x * this.game.clockTick;
            this.y += this.velocity.y * this.game.clockTick;
            ent.x += ent.velocity.x * this.game.clockTick;
            ent.y += ent.velocity.y * this.game.clockTick;
            if (this.color !== ent.color) {
            	this.radius -= 10;
            	ent.radius -= 10;
            	if(this.radius <= 0) {
            		this.isAlive = false;
            	}
	            if(ent.radius <= 0) {
	            	ent.isALive = false;
	            	this.game.entities[i].removeFromWorld = true;
	            }		            	
            }
        }

        //follow
        if (ent != this && this.collide({ x: ent.x, y: ent.y, radius: this.visualRadius })) {
            var dist = distance(this, ent);
            if (this.color !== ent.color && dist > this.radius + ent.radius + 10) {
                var difX = (ent.x - this.x)/dist;
                var difY = (ent.y - this.y)/dist;
                this.velocity.x += difX / (dist*dist);
                this.velocity.y += difY / (dist * dist);
                var speed = Math.sqrt(this.velocity.x*this.velocity.x + this.velocity.y*this.velocity.y);
                if (speed > maxSpeed) {
                    var ratio = maxSpeed / speed;
                    this.velocity.x *= ratio;
                    this.velocity.y *= ratio;
                }
            }
        }
        
    }


    this.velocity.x -= (1 - friction) * this.game.clockTick * this.velocity.x;
    this.velocity.y -= (1 - friction) * this.game.clockTick * this.velocity.y;
};

Circle.prototype.draw = function (ctx) {
	if(this.isAlive) {
	    ctx.beginPath();
	    ctx.fillStyle = this.colors[this.color];
	    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);//x,y,r,start drawing,end drawing,which way to draw
	    ctx.fill();
	    ctx.closePath();
	}
};