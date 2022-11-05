
emcc add.cpp -o add.js -s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap', 'UTF8ToString']" -s EXPORTED_FUNCTIONS="['_malloc', '_free']" --js-library lib.js
