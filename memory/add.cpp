#include <emscripten.h>
#include <stdio.h>
#include <stdlib.h>

extern "C" {

EMSCRIPTEN_KEEPALIVE void console(int level, int value);

// 参数是两个int数字，返回值也是int数值，不涉及内存交换，直接调用返回 
EMSCRIPTEN_KEEPALIVE
int add(int p1, int p2) {
  int ret = p1 + p2;
  
  console(1, ret);
  return ret;
}

// 返回的是一个块内存空间，并涉及malloc和free
EMSCRIPTEN_KEEPALIVE int getStr(void) {
  char * str = (char*)malloc(1024*1024*5);

  snprintf(str, 60, "This is malloc buffer in C++, after use need free!");

  return (int)str;
}

// JS传入大块数据
EMSCRIPTEN_KEEPALIVE int array_sum(int * ptr , int count) {
  int sum = 0;
  for(int i = 0;i< count;i++) {
    sum += ptr[i];
  }

  EM_ASM(getStr());

  return sum;
}

EMSCRIPTEN_KEEPALIVE int callJS(){
  EM_ASM(callFromEM_ASM());

  int ret = EM_ASM_({return callFromEM_ASM()});
  return ret;
}

}
