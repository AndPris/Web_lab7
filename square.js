let animationTimer;

class Square {
	#x = 0;
	#y = 0;
	#size = 0;
	#color = 0;
	#speedX = 0;
	#speedY = 0;
	#canvas = 0;
	#context = 0;

	constructor(x, y, size, color, speedX, speedY, canvas) {
		this.#x = x;
		this.#y = y;
		this.#size = size;
		this.#color = color;
		this.#speedX = speedX;
		this.#speedY = speedY;
		this.#canvas = canvas;
		this.#context = this.#canvas.getContext("2d");

		this.draw();
	}

	draw() {
		this.#context.fillStyle = this.#color;
		this.#context.fillRect(this.#x, this.#y, this.#size, this.#size);
	}

	move() {
		this.#x += this.#speedX;
		this.#y += this.#speedY;
	}

	checkCollisions() {
		if(this.#x < 0 || (this.#x+this.#size) > this.#canvas.width)
			this.#speedX = - this.#speedX;
		if(this.#y < 0 || (this.#y+this.#size) > this.#canvas.height)
			this.#speedY = - this.#speedY;
	}

	collide(anotherSquare) {
		return this.#x >= anotherSquare.#x && this.#y >= anotherSquare.#y &&
				this.#x+this.#size <= anotherSquare.#x+anotherSquare.#size &&
				this.#y+this.#size <= anotherSquare.#y+anotherSquare.#size;
	}
}

function startAnimation() {
	stopAnimation();

	let canvas = document.getElementById("anim");
	let context = canvas.getContext("2d");

	let texture = new Image();
	texture.src = "texture.jpg";
	texture.onload = () => {drawTexture(canvas, context, texture);};

	let square1Size = 10;
	let square2Size = 20;

	let square1 = new Square(0, (canvas.height-square1Size)/2, square1Size, "red", 3, 0, canvas);
	let square2 = new Square((canvas.width-square2Size)/2, 0, square2Size, "green", 0, 2, canvas);

	animationTimer = setInterval(() => {
		context.clearRect(0, 0, canvas.width, canvas.height);
		
		drawTexture(canvas, context, texture)		
		
		square1.draw();
		square1.move();
		square1.checkCollisions();

		square2.draw();
		square2.move();
		square2.checkCollisions();

		if(square1.collide(square2)) {
			alert("Collide!");
			clearInterval(animationTimer);
		}
	}, 30);
}

function drawTexture(canvas, context, texture) {
    let pattern = context.createPattern(texture, "repeat");
    context.fillStyle = pattern;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function stopAnimation() {
	clearInterval(animationTimer);
}