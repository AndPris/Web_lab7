async function createWorkArea() {
	let section = document.querySelector('.section3');
	removeAllChildren(section);
	
	let controls = document.createElement('section');
	controls.classList.add('controls');

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

async function start() {
	let promise = createWorkArea();
	let result = await promise;

	startAnimation();
}