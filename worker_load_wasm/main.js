let gWorker = new Worker('worker.js');

gWorker.onmessage = (event) => {
  console.log(event.data);
}

function sendToWorker() {
  gWorker.postMessage('Are your ready!');
}

function btnAction() {
  console.log('button click!');
}

document.getElementById('btn_submit').addEventListener('click', sendToWorker);


