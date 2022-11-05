mergeInto(LibraryManager.library, {
  // 这里有字符串无法传递的问题，需要解决，线用数字测试
  console: function (level, value) {
    console.log(`call console level:${level}, value:${value}`);
    // let el = document.getElementById('return_text');
    
  }
})
