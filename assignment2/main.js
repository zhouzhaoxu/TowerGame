var AM = new AssetManager();
var gameEngine = new GameEngine();
//the "main" code begins here
var friction = 1;
var acceleration = 1000000;
var maxSpeed = 300;

//function loadAssets() {
	AM.queueDownload("./img/health bar_BW.png");
	AM.queueDownload("./img/960px-Blank_Go_board.png");
	AM.queueDownload("./img/black.png");
	AM.queueDownload("./img/white.png");
	//AM.downloadAll(startGame);
//}

AM.downloadAll(function () {
	console.log("starting up da sheild");
    var canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
 
    //var base = new Base(gameEngine);
    //base.setIt();
    //gameEngine.addEntity(circle);
    for (var i = 0; i < 2; i++) {
    	base = new Base(gameEngine, i);
    	base.setColor(i);
        gameEngine.addEntity(base);
    }
    gameEngine.init(ctx);
    gameEngine.start();
});