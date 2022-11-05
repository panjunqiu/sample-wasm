window.filterWasm = ()=>{
  console.log('wait module loaded!');
}

document.addEventListener("DOMContentLoaded", async () => {
  let { instance } = await WebAssembly.instantiateStreaming(
    fetch("./dip.wasm")
  );
  let {
    cppConvFilter,
    cppGetkernelPtr,
    cppGetDataPtr,
    memory,
  } = instance.exports;

  // filters functions.
  const dataOffset = cppGetDataPtr();
  const kernOffset = cppGetkernelPtr();

  const flatKernel = kernel.reduce((acc, cur) => acc.concat(cur), []);
  let Uint8View = new Uint8Array(memory.buffer);
  let Int8View = new Int8Array(memory.buffer);
  Int8View.set(flatKernel, kernOffset);

  function filterWasm(pixelData, width, height) {
    const arLen = pixelData.length;

    Uint8View.set(pixelData, dataOffset);

    // core.
    cppConvFilter(width, height, 4);

    // retrieve data.
    return Uint8View.subarray(dataOffset, dataOffset + arLen);
  }
  // 放在windows中给index.js使用
  window.filterWasm = filterWasm;
});
