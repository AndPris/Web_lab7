async function createWorkArea() {
	let section = document.querySelector('.section3');
	removeAllChildren(section);

	let controls = document.createElement('section');
	controls.classList.add('controls');

	let closeBtn = createButton("Close", removeWorkArea, controls);

	let startBtn = createButton("Start", startButtonClick, controls);
	startBtn.setAttribute('id', 'startBtn');

	let anim = document.createElement('canvas');
	anim.classList.add('anim');
	anim.setAttribute('id', 'anim');

	section.append(controls, anim);
}

function removeAllChildren(parentElement) {
    while (parentElement.firstChild) {
 	   parentElement.removeChild(parentElement.firstChild);
    }
}

function createButton(text, onclickHandler, container) {
	let button = document.createElement('button');
	button.textContent = text;
	button.addEventListener("click", onclickHandler);
	container.append(button);
	return button;
}

function removeWorkArea() {
	let section = document.querySelector('.section3');
	removeAllChildren(section);
	clearInterval(animationTimer);
}

async function start() {
	let promise = createWorkArea();
	let result = await promise;
}

function startButtonClick(event) {
	event.target.style.display = "none";
	startAnimation();
}