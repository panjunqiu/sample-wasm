#include <emscripten.h>
extern "C" {
// 声明倒入的函数，实现在lib.js中
EMSCRIPTEN_KEEPALIVE void console(int level, int value);

// 定义一个add函数，导出给JS使用
EMSCRIPTEN_KEEPALIVE
int add(int p1, int p2) {
  int ret = p1 + p2;
  
  console(1, ret);
  return ret;
}
}
