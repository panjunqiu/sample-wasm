#include <stdio.h>

// 相加函数
int add(int p1, int p2) {
  int ret = p1 + p2;
  
  return ret;
}

int main(int argc, char** argv) {
  int ret = add(1,2);
  printf("1+2=%d\n",ret);
  return 0;
}
