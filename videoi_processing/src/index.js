document.addEventListener("DOMContentLoaded", async () => {

  const STATUS = ["STOP", "JS", "WASM"];
  let globalStatus = "STOP";

  // listeners.
  document.querySelector("button").addEventListener("click", () => {
    globalStatus =
      STATUS[
        Number(document.querySelector("input[name='options']:checked").value)
      ];
  });

  // variable and parameters.
  var fpsNumDisplayElement = document.querySelector(".fps-num");
  var jsTimeRecords = [],
    wasmTimeRecords = [];
  var clientX, clientY;
  function calcFPS(vector) {
    const AVERAGE_RECORDS_COUNT = 200;
    if (vector.length > AVERAGE_RECORDS_COUNT) {
      vector.shift(-1);
    } else {
      return "NaN";
    }
    let averageTime =
      vector.reduce((pre, item) => {
        return pre + item;
      }, 0) / Math.abs(AVERAGE_RECORDS_COUNT);
    return (1000 / averageTime).toFixed(0);
  }

  // the main process.
  let video = document.querySelector(".video");
  let canvas = document.querySelector(".canvas");

  // get a canvas context2D.
  let context2D = canvas.getContext("2d");

  // autoplay the video.
  let promise = video.play();
  if (promise !== undefined) {
    promise.catch((error) => {
      console.error("Can not autoplay!");
    });
  }

  // drawing function.
  function draw() {
    // record performance.
    const timeStart = performance.now();

    // render the first frame from the top-left of the canvas.
    context2D.drawImage(video, 0, 0);

    // get current video data.
    pixels = context2D.getImageData(0, 0, video.videoWidth, video.videoHeight);

    switch (globalStatus) {
      case "JS": {
        pixels.data.set(filterJS(pixels.data, clientX, clientY));
        break;
      }
      case "WASM": {
        pixels.data.set(filterWasm(pixels.data, clientX, clientY));
        break;
      }
    }

    // append image onto the canvas.
    context2D.putImageData(pixels, 0, 0);

    let timeUsed = performance.now() - timeStart;

    // update frame number.
    switch (globalStatus) {
      case "JS": {
        jsTimeRecords.push(timeUsed);
        fpsNumDisplayElement.innerHTML = calcFPS(jsTimeRecords);
        break;
      }
      case "WASM": {
        wasmTimeRecords.push(timeUsed);
        fpsNumDisplayElement.innerHTML = calcFPS(wasmTimeRecords);
        break;
      }
      default:
        wasmTimeRecords.push(timeUsed);
        fpsNumDisplayElement.innerHTML = calcFPS(wasmTimeRecords);
    }

    // continue.
    requestAnimationFrame(draw);
  }

  // init canvas.
  video.addEventListener("loadeddata", () => {
    // set the size of current stage.
    canvas.setAttribute("height", video.videoHeight);
    canvas.setAttribute("width", video.videoWidth);

    // get the drawing size of the stage.
    clientX = canvas.clientWidth;
    clientY = canvas.clientHeight;

    // start drawing!
    draw(context2D);
  });
});
