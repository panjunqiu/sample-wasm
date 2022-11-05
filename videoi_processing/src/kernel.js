
// filters related stuff.
const kernel = flipKernel([
  [-1, -1, 1],
  [-1, 14, -1],
  [1, -1, -1],
]);

function flipKernel(kernel) {
  const h = kernel.length;
  const half = Math.floor(h / 2);
  for (let i = 0; i < half; ++i) {
    for (let j = 0; j < h; ++j) {
      let _t = kernel[i][j];
      kernel[i][j] = kernel[h - i - 1][h - j - 1];
      kernel[h - i - 1][h - j - 1] = _t;
    }
  }
  if (h & 1) {
    for (let j = 0; j < half; ++j) {
      let _t = kernel[half][j];
      kernel[half][j] = kernel[half][h - j - 1];
      kernel[half][h - j - 1] = _t;
    }
  }
  return kernel;
}
