importScripts('add.js');

onmessage = (event) => {
  console.log(event.data);

  postMessage('I am ready!');
}
postMessage('I am ready!!');

Module.onRuntimeInitialized = ()=> {
  console.log('module initialized!');
  console.log(Module);
  let ret = Module._add(111,222);
  // var result = Module.ccall(ident, returnType, argTypes, args);
  // let ret = Module.ccall('add', 'number', ['number', 'number'], [111,222]);
  console.log('111 + 222 = ', ret);
}
