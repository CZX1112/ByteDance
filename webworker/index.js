const first = document.querySelector('#no.1');
const second = document.querySelector('#no.2');

const result = document.querySelector('.result');
if (window.Worker) {
    console.log('Your browser  support web workers.');
    const myWorker = new Worker("worker.js");

    first.onchange = function () {
        myWorker.postMessage([first.value, second.value]);
        console.log('Message posted to worker');
    }

    second.onchange = function () {
        myWorker.postMessage([first.value, second.value]);
        console.log('Message posted to worker');
    }

    myWorker.onmessage = function (e) {
        result.textContent = e.data;
    }
} else {
    console.log('Your browser doesn\'t support web workers.');
}