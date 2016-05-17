var AM = new AssetManager();
var gameEngine = new GameEngine();


AM.queueDownload("./img/titleScreen1.jpg");
AM.queueDownload("./img/textbox.png");
//AM.queueDownload("./img/health_bar.png");
AM.queueDownload("./img/magician.png");
AM.queueDownload("./img/magician2.png");
//AM.queueDownload("./img/gameboard.jpg");
//AM.queueDownload("./img/explosion.png");
//AM.queueDownload("./img/snowball.png");
//AM.queueDownload("./img/light.png");
AM.queueDownload("./img/fireball_0.png");
//AM.queueDownload("./img/coin.png");
//AM.queueDownload("./img/heart.png");
AM.queueDownload("./img/tileSheet.jpg");


AM.downloadAll(function () {
	var canvas = document.getElementById("gameWorld");
	var ctx = canvas.getContext("2d");

	var gameEngine = new GameEngine();
	gameEngine.init(ctx);
	gameEngine.start();
	var firstMap = [
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
"               rrrrr              ",
    ];
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/tileSheet.jpg"), firstMap));

	//gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/gameboard.jpg")));
	gameEngine.addEntity(new Magician(gameEngine, AM.getAsset("./img/magician.png"), 
			AM.getAsset("./img/magician2.png")));
	//gameEngine.addEntity(new Human1(gameEngine, AM.getAsset("./img/health_bar.png")));
	//gameEngine.addEntity(new FireBall(gameEngine, AM.getAsset("./img/explosion.png")));
	//gameEngine.addEntity(new Light(gameEngine, AM.getAsset("./img/light.png")));
	//gameEngine.addEntity(new Snowball(gameEngine, AM.getAsset("./img/snowball.png")));
	//gameEngine.addEntity(new Spell(gameEngine, AM.getAsset("./img/fireball_0.png")));
	//gameEngine.addEntity(new Coin(gameEngine, AM.getAsset("./img/coin.png")));
	//gameEngine.addEntity(new Heart(gameEngine, AM.getAsset("./img/heart.png")));
	//x 33, y 27
	//var firstLevel = new Level(gameEngine);
    
    /*var mapBlock = {
        "r" : new Animation(AM.getAsset("./img/tileSheet.jpg"), GAME_CONSTANT.BLOCK_GRASS_X, 
        		GAME_CONSTANT.BLOCK_GRASS_Y,GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
        		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
        		GAME_CONSTANT.BLOCK_LOOP),
        " " : new Animation(AM.getAsset("./img/tileSheet.jpg"),GAME_CONSTANT.BLOCK_ROAD_X, 
        		GAME_CONSTANT.BLOCK_ROAD_Y, GAME_CONSTANT.BLOCK_SIZE, GAME_CONSTANT.BLOCK_SIZE, 
        		GAME_CONSTANT.BLOCK_SHEETWIDTH, GAME_CONSTANT.BLOCK_FRAMEDURATION, GAME_CONSTANT.BLOCK_FRAMES, 
        		GAME_CONSTANT.BLOCK_LOOP)
    };*/
    //mapBlock["r"].addFrame(0, 0);
    //mapBlock[" "].addFrame(0, 0);
    
	console.log("All Done!");
});

/*var CANVAS_WIDTH = 1000;
var CANVAS_HEIGHT = 800;

var makeSceneManager = function (gameEngine) {
   
    var titleScene = new Title(gameEngine);
    var tutorialScene = new Tutorial(gameEngine);
    
    var r1 = createFirstRound(gameEngine); // first round
 
    titleScene.next = r1;
    titleScene.tutorialScene = tutorialScene;
    tutorialScene.next = titleScene;

    return new SceneManager(gameEngine, logoSplash);
};*/

