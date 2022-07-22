// Imports
import { setUpGround, updateGround } from "../JavaScript/ground.js";
import { loseDino, setUpDino, updateDino, getDinoRect } from "../JavaScript/dino.js";
import { setUpCactus, updatecactus, getCactusRects } from "./cactus.js";

// Variables and constants
const LOSE_EFFECT = new Audio('./Audios/die.wav');
const START_SCREEN = document.getElementById('start-screen');
const SCORE = document.getElementById('score');
const SPEED_INCREASE = 0.00001;

let scale;
let score;
let lastTime;

// Game functions 
function startGame() {
    scale = 1;
    score = 0;
    lastTime = null;
    setUpGround();
    setUpDino();
    setUpCactus();
    START_SCREEN.classList.add('hide');
    window.requestAnimationFrame(GameLoop);
}

function handleLose() {
    loseDino();
    LOSE_EFFECT.play();
    window.addEventListener('keydown', startGame, {once: true});
    window.addEventListener('click', startGame, {once: true});
}

function checkLose() {
    const dinoRect = getDinoRect()
    return getCactusRects().some(rect => isCollision(rect, dinoRect))
  }
  
  function isCollision(rect1, rect2) {
    return (
      rect1.left < rect2.right &&
      rect1.top < rect2.bottom &&
      rect1.right > rect2.left &&
      rect1.bottom > rect2.top
    )
  }

function updateScore(delta) {
    score += delta * 0.01;
    SCORE.innerText = parseInt(score);
}

function updateScale(delta) {
    scale += delta * SPEED_INCREASE;
}

// GameLoop for constantly changing screen pixels
function GameLoop(time) {
    if (lastTime === null) {
        lastTime = time;
        window.requestAnimationFrame(GameLoop);
        return;
    } 
    const delta = time - lastTime;
    lastTime = time;

    updateGround(delta, scale);
    updateDino(delta, scale);
    updateScore(delta);
    updateScale(delta);
    updatecactus(delta, scale);
    if (checkLose()) return handleLose();

    window.requestAnimationFrame(GameLoop);
}

window.addEventListener('keydown', startGame, {once: true});
window.addEventListener('click', startGame, {once: true});