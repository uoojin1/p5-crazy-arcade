"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require("socket.io-client");
var constants_1 = require("./constants");
var Bomb_1 = require("./classes/Bomb");
// import { keyPressed } from './keyboardEvent'
// constants
var c;
var x = 50;
var y = 50;
var bombs = [];
// set up function
var setup = function (p5) { return function () {
    // open socket connection
    var HOST = location.origin.replace(/^http/, 'ws');
    var ws = io(HOST);
    ws.on('message', function (message) {
        console.log('got message!', message);
    });
    // create canvas
    p5.createCanvas.apply(p5, c.canvasSize);
    // set background color
    p5.background(c.backgroundColor);
    // set the framerate to 3 fps
    p5.frameRate(40);
}; };
var keyPressed = function (p5) { return function () {
    // pressed spacebar
    if (p5.keyCode === 32) {
        console.log("BOMB @ x: " + x + ", y: " + y);
        bombs.push(new Bomb_1.Bomb(x, y, 2500));
        console.log('bombs', bombs);
    }
}; };
var resetCanvas = function (p5) {
    p5.clear();
    p5.background(c.backgroundColor);
};
var drawBomb = function (p5) {
    p5.fill(p5.color(255, 204, 0));
    bombs.forEach(function (bomb) { return p5.circle(bomb.x, bomb.y, 20); });
};
var drawPlayer = function (p5) {
    p5.noStroke();
    p5.fill(p5.color(255, 255, 255));
    p5.circle(x, y, 30);
};
var checkExplosion = function (p5) {
    for (var i = 0; i < bombs.length; i++) {
        var bomb = bombs[i];
        if (bomb.isExploded === true) {
            console.log('explosion!!!!', bomb);
            p5.fill(p5.color(255, 204, 0));
            p5.noStroke();
            p5.ellipse(bomb.x, bomb.y, 80, 20);
            p5.ellipse(bomb.x, bomb.y, 20, 80);
            bombs.shift();
            console.log('bombs left..', bombs);
        }
        else {
            break;
        }
    }
};
// function that runs on every new frame
var draw = function (p5) { return function () {
    // reset canvas
    resetCanvas(p5);
    // movement
    if (p5.keyIsDown(p5.LEFT_ARROW)) {
        x -= 10;
    }
    if (p5.keyIsDown(p5.RIGHT_ARROW)) {
        x += 10;
    }
    if (p5.keyIsDown(p5.UP_ARROW)) {
        y -= 10;
    }
    if (p5.keyIsDown(p5.DOWN_ARROW)) {
        y += 10;
    }
    // p5.ellipse(x, y, 40, 40);
    drawBomb(p5);
    checkExplosion(p5);
    drawPlayer(p5);
}; };
// The main function that gets run by the P5Canvas
function sketch(p5) {
    // initialize constants
    c = new constants_1.Constants(p5);
    // set up the sketch
    p5.setup = setup(p5);
    // on key press
    p5.keyPressed = keyPressed(p5);
    // funciton to run on every new frame
    p5.draw = draw(p5);
}
exports.sketch = sketch;
//# sourceMappingURL=index.js.map