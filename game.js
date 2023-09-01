import Snake from "./snake";
import Food from "./food";

const DEFAULT_SPEED = 200;

class Game {
  constructor() {
    this.setup()
  }

  setup() {
    this.snake = new Snake();
    this.food = new Food();
    this.direction = "left";
    this.score = 0;
  }

  updateScore() {
    document.getElementById("score").innerHTML = `Score: ${this.score}`;
  }

  gameOver() {
    clearInterval(this.interval);
    this.interval = null;
    const container = document.getElementById("container");
    const top = container.offsetHeight / 2;
    const left = container.offsetWidth / 2;
    const gameOverText = document.createElement("P");
    gameOverText.style.top = `${top}px`;
    gameOverText.style.left = `${left - 80}px`;
    gameOverText.style.position = "absolute";
    gameOverText.innerHTML = "Game Over.... <br /> Press Enter to play again";
    document.getElementById("board").appendChild(gameOverText);
  }

  start() {
    this.interval = setInterval(() => {
      this.snake.move(this.direction);

      if (this.snakeConsumeFood()) {
        this.score++;
        this.food.refreshPosition();
        this.snake.grow();
        this.updateScore();
      }

      if (this.snakeHitTheSideOfTheWall()) {
        this.gameOver();
      }

      if (this.snakeHitItsBody()) {
        this.gameOver();
      }
    }, DEFAULT_SPEED);
    this.listenForControl();
    this.updateScore();
  }

  snakeHitItsBody() {
    const left = Number(this.snake.head.style.left.replace("px", ""));
    const top = Number(this.snake.head.style.top.replace("px", ""));
    for (let i = 1; i < this.snake.segments.length; i++) {
      const segmentTop = Math.abs(
        Number(this.snake.segments[i].style.top.replace("px", ""))
      );
      const segmentLeft = Math.abs(
        Number(this.snake.segments[i].style.left.replace("px", ""))
      );

      if (
        Math.abs(segmentTop - Math.abs(top)) < 15 &&
        Math.abs(segmentLeft - Math.abs(left)) < 15
      ) {
        return true;
      }
    }

    return false;
  }

  clearScreen() {
    document.getElementById("board").innerHTML = '';
  }

  snakeHitTheSideOfTheWall() {
    const left = Number(this.snake.head.style.left.replace("px", ""));
    const top = Number(this.snake.head.style.top.replace("px", ""));
    const boardBound = document.getElementById("board").getBoundingClientRect();

    return (
      top < boardBound.top + this.snake.segmentSize * 2 ||
      top > boardBound.bottom ||
      left < boardBound.left + this.snake.segmentSize ||
      left > boardBound.right - this.snake.segmentSize * 2
    );
  }

  snakeConsumeFood() {
    return (
      Math.abs(
        Math.abs(Number(this.snake.head.style.left.replace("px", ""))) -
          Math.abs(Number(this.food.instance.style.left.replace("px", "")))
      ) < 15 &&
      Math.abs(
        Math.abs(Number(this.snake.head.style.top.replace("px", ""))) -
          Math.abs(Number(this.food.instance.style.top.replace("px", "")))
      ) < 15
    );
  }

  listenForControl() {
    window.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          if (this.direction === "down") {
            break;
          }
          this.direction = "up";
          break;
        case "ArrowDown":
          if (this.direction === "up") {
            break;
          }
          this.direction = "down";
          break;
        case "ArrowLeft":
          if (this.direction === "right") {
            break;
          }
          this.direction = "left";
          break;
        case "ArrowRight":
          if (this.direction === "left") {
            break;
          }
          this.direction = "right";
          break;
        case "Enter":
        if(!this.interval) {
          this.clearScreen()
          this.setup();
          this.start()
        }
        break;
      }
    });
  }
}

export default Game;
