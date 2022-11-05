
mergeInto(LibraryManager.library, {
  // 这里有字符串无法传递的问题，需要解决，先数字测试
  console: function (level, value) {
    console.log(`call console level:${level}, value:${value}`);
  }
})
