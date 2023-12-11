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
		this.setCoords(x, y);
		this.#size = size;
		this.#color = color;
		this.setSpeed(speedX, speedY);
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

	setCoords(x, y) {
		this.#x = x;
		this.#y = y;
	}

	setSpeed(speedX, speedY) {
		this.#speedX = speedX;
		this.#speedY = speedY;
	}
}

class Animation {
	#animationTimer;

	#canvas;
	#context;
	#texture;

	#square1;
	#square1Size;
	#square1X;
	#square1Y;
	#square1SpeedX;
	#square1SpeedY;

	#square2;
	#square2Size;
	#square2X;
	#square2Y;
	#square2SpeedX;
	#square2SpeedY;

	constructor() {
		this.#canvas = document.getElementById("anim");
		this.#context = this.#canvas.getContext("2d");

		this.#square1Size = 10;
		this.#square1X = 0;
		this.#square1Y = (this.#canvas.height-this.#square1Size)/2;
		this.#square1SpeedX = 3;
		this.#square1SpeedY = 0;

		this.#square2Size = 20;
		this.#square2X = (this.#canvas.width-this.#square2Size)/2;
		this.#square2Y = 0;
		this.#square2SpeedX = 0;
		this.#square2SpeedY = 2;

		this.#square1 = new Square(this.#square1X, this.#square1Y, this.#square1Size, "red", this.#square1SpeedX, this.#square1SpeedY, this.#canvas);
		this.#square2 = new Square(this.#square2X, this.#square2Y, this.#square2Size, "green", this.#square2SpeedX, this.#square2SpeedY, this.#canvas);

		this.#texture = new Image();
		this.#texture.src = "texture.jpg";
		this.#texture.onload = () => {this.drawTexture();
										this.#square1.draw();
										this.#square2.draw();};
	}

	drawTexture() {
	    let pattern = this.#context.createPattern(this.#texture, "repeat");
	    this.#context.fillStyle = pattern;
	    this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height);
	}

	drawInitialState() {
		this.clearContext();
		
		this.drawTexture()		
		
		this.#square1.setCoords(this.#square1X, this.#square1Y);
		this.#square1.setSpeed(this.#square1SpeedX, this.#square1SpeedY);
		this.#square1.draw();

		this.#square2.setCoords(this.#square2X, this.#square2Y);
		this.#square2.setSpeed(this.#square2SpeedX, this.#square2SpeedY);
		this.#square2.draw();
	}

	startAnimation() {
		this.stopAnimation();
	
		this.#animationTimer = setInterval(() => {
			this.clearContext();

			this.drawTexture();	
			
			this.#square1.draw();
			this.#square1.move();
			this.#square1.checkCollisions();

			this.#square2.draw();
			this.#square2.move();
			this.#square2.checkCollisions();

			if(this.#square1.collide(this.#square2)) {
				alert("Collide!");
				this.stopAnimation();
			}
		}, 30);
	}

	clearContext() {
		this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
	}

	stopAnimation() {
		clearInterval(this.#animationTimer);
	}
}
