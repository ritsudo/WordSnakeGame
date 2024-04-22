    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake = [{ x: 10, y: 10 }];
    let dx = 0;
    let dy = 0;
    let food = { x: 15, y: 15 };
	
	let words = ['АВТОМОБИЛЬ', 'КОШКА', 'ЧАШКА', 'ДЕРЕВО', 'СОЛНЦЕ', 'КНИГА', 'ЧАСЫ', 'КВАРТИРА', 'ЯБЛОКО', 'БУТЫЛКА'];

    function drawSnake() {
      snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x * box, segment.y * box, box, box);
      });
    }

    function drawFood() {
      ctx.fillStyle = "red";
      ctx.fillRect(food.x * box, food.y * box, box, box);
    }

    function moveSnake() {
		ddx = food.x - snake[0].x;
		ddy = food.y - snake[0].y;
		
//		console.log(ddx, ddy);
		
		if (ddx != 0) {
			if (dy != 0) {
				dy = 0
			}
			if (ddx > 0) {
				dx = 1
			} else if (ddx < 0) {
				dx = -1
			}
		}
		else if (ddy != 0) {
			if (dx != 0) {
				dx = 0
			}
			if (ddy > 0) {
				dy = 1
			} else if (ddy < 0) {
				dy = -1
			}
		}
		
      const head = { x: snake[0].x + dx, y: snake[0].y + dy };
      snake.unshift(head);
      if (head.x === food.x && head.y === food.y) {
        generateFood();
      } else {
        snake.pop();
      }
    }

    function generateFood() {
      food = {
        x: Math.floor(Math.random() * (canvas.width / box)),
        y: Math.floor(Math.random() * (canvas.height / box))
      };
    }

    function checkCollision() {
      const head = snake[0];
	  /*
      return (
        head.x < 0 ||
        head.x >= canvas.width / box ||
        head.y < 0 ||
        head.y >= canvas.height / box ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
      );
	  */
	  return false;
    }

    function main() {
      if (checkCollision()) {
        clearInterval(game);
        alert("Game Over!");
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawSnake();
      drawFood();
      moveSnake();
    }

    document.addEventListener("keydown", event => {
      const direction = event.key.replace("Arrow", "");
	  /*
      if (direction === "Up" && dy === 0) {
        dx = 0;
        dy = -1;
      } else if (direction === "Down" && dy === 0) {
        dx = 0;
        dy = 1;
      } else if (direction === "Left" && dx === 0) {
        dx = -1;
        dy = 0;
      } else if (direction === "Right" && dx === 0) {
        dx = 1;
        dy = 0;
      }
	  */
	  if (direction === "Up") {
        food.y -= 1;
      } else if (direction === "Down") {
        food.y += 1;
      } else if (direction === "Left") {
        food.x -= 1;
      } else if (direction === "Right") {
        food.x += 1;
      }
    });

    generateFood();
    const game = setInterval(main, 100);