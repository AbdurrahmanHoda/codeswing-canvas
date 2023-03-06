document.addEventListener("keydown", keyHandler, false);
const canvas = document.getElementById("game-area");
const statusDiv = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const highscoreDiv = document.getElementById("highscore");
const scoreDiv = document.getElementById("scoreDiv");
const context = canvas.getContext("2d");
const gridSize = 40;
const blockWidth = canvas.width / gridSize;
const blockHeight = canvas.height / gridSize;

let food = [];
let snake = [];
let direction = "right";
const snakeStartLength = 5;
let highscore = 0;
let score = 0;

function keyHandler(e) {
  if (e.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (e.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (e.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  } else if (e.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  }
}

function start() {
  startBtn.disabled = true;
  statusDiv.innerHTML = "";
  score = 0;
  scoreDiv.innerHTML = "Score: " + score;
  context.clearRect(0, 0, canvas.width, canvas.height);
  score++;

  snake.length = 0;
  for (let i = 0; i < snakeStartLength; i++) {
    snake.push({ x: 10 - i, y: 1 });
  }

  createfood();

  drawSnake();
  direction = "right";
  setTimeout(tick, 100);
}

function drawBlock(block, color) {
  // block has an x and y coordinate
  context.fillStyle = color;
  context.fillRect(block.x * 10, block.y * 10, 10, 10);
}

function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    let seven = 240 + (i * 10);
    drawBlock(snake[i], "hsl( " + seven  + " deg 100% 50%)");
  }
}

function moveSnake() {
  console.log("Move snake:", direction);
  let newHead = {};
  if (direction === "right") {
    newHead = { x: snake[0].x + 1, y: snake[0].y };
  } else if (direction === "left") {
    newHead = { x: snake[0].x - 1, y: snake[0].y };
  } else if (direction === "down") {
    newHead = { x: snake[0].x, y: snake[0].y + 1 };
  } else if (direction === "up") {
    newHead = { x: snake[0].x, y: snake[0].y - 1 };
  }

  snake.unshift(newHead);
  if (newHead.x === food.x && newHead.y === food.y && setTimeout(tick + 10)) {
    createfood();
    score++;
    if (score > highscore) {
      highscore = score;
    }
  } else {
    snake.pop();
  }
}

function tick() {
  moveSnake();

  let con = collision();
  if (con) {
    statusDiv.innerHTML = "Game Over!";
    startBtn.disabled = false;
  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawfood();
    setTimeout(tick, 100);
  }
}

function collision() {
  if (snake[0].x == -1 || snake[0].x == 40) {
    return true;
  }
  if (snake[0].y == -1 || snake[0].y == 40) {
    return true;
  }
  for (i = 1; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[0].y === snake[i].y) {
      return true;
    }
  }
  return false;
  score++;
}

function drawfood() {
  drawBlock(food, "aqua");
}

function createfood() {
  food.x = Math.floor(Math.random() * 40);
  food.y = Math.floor(Math.random() * 40);
}
