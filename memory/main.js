
  let getStr = ()=>{console.log('getStr is not initialized!')};
  let arraySum = ()=>{console.log('arraySum is not initialized!')};

  Module.onRuntimeInitialized = ()=> {
    console.log('module initialized!');
    console.log(Module);
    let ret = Module._add(111,222);
    // var result = Module.ccall(ident, returnType, argTypes, args);
    // let ret = Module.ccall('add', 'number', ['number', 'number'], [111,222]);
    console.log('111 + 222 = ', ret);

    getStr = () => {
      // 获取cpp中的字符串，内部malloc了5M内存
      let strAddr = Module._getStr();
      console.log(`string address: ${strAddr}`);

      // 使用Module的方法
      let retStr2 = Module.UTF8ToString(strAddr, 60);
      console.log('ret2:',retStr2);

      // 把buffer数据取出来，解码出字符串
      let strBuf = Module.HEAPU8.slice(strAddr, strAddr+60);
      let enc = new TextDecoder("utf-8");
      let retStr = enc.decode(strBuf);
      console.log(`decode:\n${strBuf} \n=> ${retStr}`);
      // 使用完后需要释放内存，若不是放多几次就会报内存不够（默认16M内存上限）
      Module._free(strAddr);

      // 可以使用ccall调用直接返回字符串，但是内存无法释放
      // let ret3 = Module.ccall('getStr', 'string');
      // console.log(`use ccall ret:${ret3}`);
    }
    // getStr();

    arraySum = ()=> {
      const numCount = 10;
      let ptr = Module._malloc(numCount*4);
      console.log(`molloc ptr:${ptr}`);

      for(i=0;i<numCount;i++){
        Module.HEAP32[ptr/4 + i] = i;
      }

      let totoal = Module._array_sum(ptr, numCount);
      console.log('array sum:', totoal);
      Module._free(ptr);
    }

    // arraySum();
   }

  document.getElementById('btn_action').addEventListener('click',()=>{getStr()});
  document.getElementById('btn_array_sum').addEventListener('click', ()=>{arraySum()});
  
  function callFromEM_ASM(){
    console.log('Call from EM_ASM');

    return 999;
  }

  document.getElementById('btn_EM_ASM').addEventListener('click', ()=>{
    let ret = Module._callJS();
    console.log('EM_ASM_ return:', ret);
  });
 
