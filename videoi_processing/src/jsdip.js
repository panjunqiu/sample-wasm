// fileters (JS polyfill).
function filterJS(pixelData, width, height) {
  return jsConvFilter(pixelData, width, height, kernel);
}


// convex function (JS version).
function jsConvFilter(data, width, height, kernel) {
  const divisor = 4;
  const h = kernel.length,
    w = h;
  const half = Math.floor(h / 2);

  // picture iteration.
  for (let y = half; y < height - half; ++y) {
    for (let x = half; x < width - half; ++x) {
      const px = (y * width + x) * 4; // pixel index.
      let r = 0,
        g = 0,
        b = 0;
      // core iteration.
      for (let cy = 0; cy < h; ++cy) {
        for (let cx = 0; cx < w; ++cx) {
          // dealing edge case.
          const cpx = ((y + (cy - half)) * width + (x + (cx - half))) * 4;

          r += data[cpx + 0] * kernel[cy][cx];
          g += data[cpx + 1] * kernel[cy][cx];
          b += data[cpx + 2] * kernel[cy][cx];
        }
      }
      data[px + 0] =
        r / divisor > 255 ? 255 : r / divisor < 0 ? 0 : r / divisor;
      data[px + 1] =
        g / divisor > 255 ? 255 : g / divisor < 0 ? 0 : g / divisor;
      data[px + 2] =
        b / divisor > 255 ? 255 : b / divisor < 0 ? 0 : b / divisor;
    }
  }
  return data;
}

