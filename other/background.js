/**
 * 
 */
function Background(game, spritesheet, map) {
    this.x = 0;
    this.y = 0;
    this.map = map;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
    this.grass = new Animation(AM.getAsset("./img/tileSheet.jpg"), GAME_CONSTANT.BLOCK_GRASS_X, 
    		GAME_CONSTANT.BLOCK_GRASS_Y,GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP);
    this.road = new Animation(AM.getAsset("./img/tileSheet.jpg"),GAME_CONSTANT.BLOCK_ROAD_X, 
    		GAME_CONSTANT.BLOCK_ROAD_Y, GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
    		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
    		GAME_CONSTANT.BLOCK_LOOP)
    //Entity.call(this, game, 350, 350);
};

Background.prototype = new Entity();
Background.prototype.constructor = Background;

Background.prototype.draw = function (ctx) {
	for(var i = 0; i < this.map.length; i++) {
	    for(var j = 0; j < this.map[i].length; j++) {
	        if(this.map[i][j] == " ") {
	        	this.grass.drawFrame(this.game.clockTick, ctx, 
	        			this.x + j * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + i * GAME_CONSTANT.BLOCK_SIZE);
//	        	this.ctx.drawImage(this.spriteSheet,
//	    				// source from sheet
//	        			GAME_CONSTANT.BLOCK_SIZE + GAME_CONSTANT.BLOCK_GRASS_X, GAME_CONSTANT.BLOCK_SIZE + GAME_CONSTANT.BLOCK_GRASS_X,  
//	        			GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE,
//	        			GAME_CONSTANT.BLOCK_SIZE * j, GAME_CONSTANT.BLOCK_SIZE * i,
//	        			GAME_CONSTANT.BLOCK_SIZE * 1,
//	        			GAME_CONSTANT.BLOCK_SIZE * 1);
	        } else if(this.map[i][j] == "r") {
	        	this.road.drawFrame(this.game.clockTick, ctx, 
	        			this.x + j * GAME_CONSTANT.BLOCK_SIZE, 
	        			this.y + i * GAME_CONSTANT.BLOCK_SIZE);
	        }
	    }
	}
	Entity.prototype.draw.call(this);
};

Background.prototype.update = function () {
	 Entity.prototype.update.call(this);
};