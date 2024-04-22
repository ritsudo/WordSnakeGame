    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const box = 20;
    let snake = [];
    let dx = 0;
    let dy = 0;
    let food = { x: 15, y: 15 };
	
	let randomNumber;
	
	let words = ['АВТОМОБИЛЬ', 'КОШКА', 'ЧАШКА', 'ДЕРЕВО', 'СОЛНЦЕ', 'КНИГА', 'ЧАСЫ', 'ДОМ', 'ЯБЛОКО', 'БУТЫЛКА'];

    function drawSnake() {
      snake.forEach(segment => {
        ctx.fillStyle = "white";
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
		ctx.font = '20px Arial';
		ctx.fillStyle = 'black';
		ctx.fillText(segment.letter, segment.x*box, segment.y*box + (box - 2));
        ctx.strokeStyle = "darkgreen";
        ctx.strokeRect(segment.x * box, segment.y * box, box, box);
      });
    }

    function drawFood() {
      ctx.fillStyle = "red";
      ctx.fillRect(food.x * box, food.y * box, box, box);
    }
	
	function fillSnake() {
		snake.splice(0, snake.length);
		randomNumber = Math.floor(Math.random() * 10);
		let randomElementLength = words[randomNumber].length;
		for (let i = 0; i < randomElementLength; i+=1) {
			snake.push({x: 10 + i, y: 10, letter: words[randomNumber][i]});
		}
	}

    function moveSnake() {
		ddx = food.x - snake[0].x;
		ddy = food.y - snake[0].y;
			
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
		
		//
      const head = { x: snake[0].x + dx, y: snake[0].y + dy, letter: words[randomNumber][0] };
	  for (let q = 0; q < words[randomNumber].length; q++) {
		  snake[q].letter = words[randomNumber][q+1]
	  }
      snake.unshift(head);
	  //
      if (head.x === food.x && head.y === food.y) {
        generateFood();
		fillSnake();
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
	fillSnake();
    const game = setInterval(main, 140);