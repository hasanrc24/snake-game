let direction = { x: 0, y: 0 };
let speed = 7;
let lastPaintTime = 0;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let score = 0;
let highScore = localStorage.getItem("highScore");
let hiScoreElem = document.getElementById("hiScore");
console.log(highScore);

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function gameEngine() {
  const board = document.getElementById("board");

  //   Display snake
  board.innerHTML = "";
  snake.forEach((e, index) => {
    let snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("snake-head");
    } else {
      snakeElement.classList.add("snake-body");
    }
    board.appendChild(snakeElement);
  });

  //   Display food
  let foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);

  //   Eating food logic
  if (snake[0].x === food.x && snake[0].y === food.y) {
    score += 1;
    let scoreBox = document.getElementById("scoreBox");
    scoreBox.innerHTML = "Score: " + score;
    speed += 0.5;

    snake.unshift({
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    });
    let a = 2;
    let b = 35;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  for (let i = snake.length - 2; i >= 0; i--) {
    snake[i + 1] = { ...snake[i] };
  }
  snake[0].x += direction.x;
  snake[0].y += direction.y;

  //   No boundary logic
  if (snake[0].x < 0) {
    snake[0].x = 40;
  } else if (snake[0].x > 40) {
    snake[0].x = 0;
  } else if (snake[0].y < 0) {
    snake[0].y = 40;
  } else if (snake[0].y > 40) {
    snake[0].y = 0;
  }

  //   Bumping itself
  for (let i = 1; i < snake.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      if (score > JSON.parse(highScore)) {
        localStorage.setItem("highScore", JSON.stringify(score));
        hiScoreElem.innerHTML = "High score: " + score;
      }
      alert(`Game over!!! Your score is: ${score}`);
      score = 0;
      speed = 7;
      snake = [{ x: 10, y: 10 }];
    }
  }
}
if (highScore === null) {
  localStorage.setItem("highScore", JSON.stringify(0));
} else {
  hiScoreElem.innerHTML = "High score: " + JSON.parse(highScore);
}

console.log(score, highScore);

let upKey = document.getElementById("up");
let leftKey = document.getElementById("left");
let downKey = document.getElementById("down");
let rightKey = document.getElementById("right");

upKey.addEventListener("click", function () {
  var event = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "ArrowUp",
    code: "ArrowUp",
  });
  document.dispatchEvent(event);
});
leftKey.addEventListener("click", function () {
  var event = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "ArrowLeft",
    code: "ArrowLeft",
  });
  document.dispatchEvent(event);
});
downKey.addEventListener("click", function () {
  var event = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "ArrowDown",
    code: "ArrowDown",
  });
  document.dispatchEvent(event);
});
rightKey.addEventListener("click", function () {
  var event = new KeyboardEvent("keydown", {
    bubbles: true,
    cancelable: true,
    key: "ArrowRight",
    code: "ArrowRight",
  });
  document.dispatchEvent(event);
});

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  direction = { x: 10, y: 10 };
  switch (e.key) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      break;
    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      break;

    default:
      break;
  }
});
