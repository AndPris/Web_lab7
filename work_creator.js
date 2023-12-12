let animation;

async function createWorkArea() {
	let section = document.querySelector('.section3');
	removeAllChildren(section);

	let controls = document.createElement('section');
	controls.classList.add('left-center');

	let messagesContainer = document.createElement('section');

	let buttonsContainer = document.createElement('section');

	let messagesParagraph = document.createElement('p');
	messagesParagraph.setAttribute('id', 'messages');
	messagesContainer.append(messagesParagraph);

	let closeBtn = createButton("Close", removeWorkArea, buttonsContainer);

	let startBtn = createButton("Start", startButtonClick, buttonsContainer);
	startBtn.setAttribute('id', 'startBtn');

	let stopBtn = createButton("Stop", stopButtonClick, buttonsContainer);
	stopBtn.setAttribute('id', 'stopBtn');
	stopBtn.style.display = "none";

	let reloadBtn = createButton("Reload", reloadButtonClick, buttonsContainer);
	reloadBtn.setAttribute('id', 'reloadBtn');
	reloadBtn.style.display = "none";

	let anim = document.createElement('canvas');
	anim.classList.add('anim');
	anim.setAttribute('id', 'anim');

	controls.append(messagesContainer, buttonsContainer);
	section.append(controls, anim);

	animation?.stopAnimation();
	animation = new Animation();
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
	animation.stopAnimation();
	saveDataFromLocalStorageIntoDB();
}

async function start() {
	let promise = createWorkArea();
	let result = await promise;

	let response = await fetch('clear_db.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
	let data = await response.text();
	console.log(data);
	messageNumber = 1; 
	localStorage.clear();
}

function startButtonClick(event) {
	event.target.style.display = "none";
	document.getElementById("stopBtn").style.display = "";
	animation.startAnimation();

	let message = "Start animation";
	displayMessage(message);
	saveMessageInLocalStorage(message);
	saveMessageInDB(message);
}

function stopButtonClick(event) {
	event.target.style.display = "none";
	document.getElementById("reloadBtn").style.display = "";
	animation.stopAnimation();

	let message = "Stop animation";
	displayMessage(message);
	saveMessageInLocalStorage(message);
	saveMessageInDB(message);
}

function reloadButtonClick(event) {
	event.target.style.display = "none";
	document.getElementById("startBtn").style.display = "";
	animation.drawInitialState();

	let message = "Reload animation";
	displayMessage(message);
	saveMessageInLocalStorage(message);
	saveMessageInDB(message);
}