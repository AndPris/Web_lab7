async function createWorkArea() {
	let section = document.querySelector('.section3');
	removeAllChildren(section);

	let controls = document.createElement('section');
	controls.classList.add('controls');

	let closeBtn = document.createElement('button');
	closeBtn.textContent = "Close";
	closeBtn.addEventListener("click", removeWorkArea);
	controls.append(closeBtn);

	let startBtn = document.createElement('button');
	startBtn.textContent = "Start";
	startBtn.setAttribute('id', 'startBtn');
	startBtn.addEventListener("click", startButtonClick);
	controls.append(startBtn);

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