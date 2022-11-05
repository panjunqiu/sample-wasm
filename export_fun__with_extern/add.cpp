#include <stdio.h>

extern "C" {
// 不依赖任何其标准输入输出等其他库的代码
int add(int p1, int p2) {
  int ret = p1 + p2;
  
  return ret;
}
}

int main(int argc, char** argv) {
  int ret = add(1,2);
  printf("1+2=%d\n",ret);
  return 0;
}
