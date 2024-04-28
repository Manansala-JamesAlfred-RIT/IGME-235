// We will use `strict mode`, which helps us by having the browser catch many common JS mistakes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
"use strict";
const app = new PIXI.Application({
	width: 600,
	height: 600
});
document.body.appendChild(app.view);

// constants
const sceneWidth = app.view.width;
const sceneHeight = app.view.height;

// pre-load the images (this code works with PIXI v6)
app.loader.
	add([
		"images/spaceship.png",
		"images/explosions.png"
	]);
app.loader.onProgress.add(e => { console.log(`progress=${e.progress}`) });
app.loader.onComplete.add(setup);
app.loader.load();

// pre-load the images (this code works with PIXI v7)
// let assets;
// loadImages();
// async function loadImages(){
// https://github.com/pixijs/pixijs/wiki/v7-Migration-Guide#-replaces-loader-with-assets
// https://pixijs.io/guides/basics/assets.html
// PIXI.Assets.addBundle('sprites', {
//  spaceship: 'images/spaceship.png',
//  explosions: 'images/explosions.png',
//  move: 'images/move.png'
//});
//
// assets = await PIXI.Assets.loadBundle('sprites');
// setup();
//}

// aliases
let stage;

// game variables
let startScene;
let gameScene, ship, scoreLabel, lifeLabel, shootSound, hitSound, fireballSound;
let gameOverScene;

let circles = [];
let bullets = [];
let aliens = [];
let explosions = [];
let explosionTextures;
let score = 0;
let life = 100;
let levelNum = 1;
let paused = true;

function setup() {
	stage = app.stage;
	// #1 - Create the `start` scene
	startScene = new PIXI.Container();
	stage.addChild(startScene);

	// #2 - Create the main `game` scene and make it invisible
	gameScene = new PIXI.Container();
	gameScene.visible = false;
	stage.addChild(gameScene);

	// #3 - Create the `gameOver` scene and make it invisible
	gameOverScene = new PIXI.Container();
	gameOverScene.visible = false;
	stage.addChild(gameOverScene);

	// #4 - Create labels for all 3 scenes
	createLabelsAndButtons();

	// #5 - Create ship

	// #6 - Load Sounds

	// #7 - Load sprite sheet

	// #8 - Start update loop

	// #9 - Start listening for click events on the canvas

	// Now our `startScene` is visible
	// Clicking the button calls startGame()
}

function createLabelsAndButtons() {
	let buttonStyle = new PIXI.TextStyle({
		fill: 0xFF0000,
		fontSize: 48,
		fontFamily: "Futura"
	});

	// Setting up Start scene
	let startLabel1 = new PIXI.Text("Circle Blast!");
	startLabel1.style = new PIXI.TextStyle({
		fill: 0xFFFFFF,
		fontSize: 96,
		fontFamily: "Futura",
		stroke: 0xFF0000,
		strokeThickness: 6
	});
	startLabel1.x = 50;
	startLablel1.y = 120;
	startScene.addChild(startLabel1);

	// Making middle start label
	let startLabel2 = new PIXI.Text("R U worthy...?");
	startLabel2.style = new PIXI.TextStyle({
		fill: 0xFFFFFF,
		fontSize: 32,
		fontFamily: "Futura",
		fontStyle: "italic",
		stroke: 0xFF0000,
		strokeThickness: 6
	});
	startLabel2.x = 185;
	startLabel2.y = 300;
	startScene.addChild(startLabel2);

	// Making start game button
	let startButton = new PIXI.Text("Enter, ... if you dare!");
	startButton.style = buttonStyle;
	startButton.x = 80;
	startButton.y = sceneHeight - 100;
	startButton.interactive = true;
	startButton.buttonMode = true;
	startButton.on("pointerup", startGame);
	startButton.on('pointerover', e => e.target.alpha = 0.7);
	startButton.on('pointerout', e => e.currentTarget.alpha = 1.0);
	startScene.addChild(startButton);
}