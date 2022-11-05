
emcc add.cpp -o add.js -s "EXPORTED_RUNTIME_METHODS=['ccall', 'cwrap']" --js-library lib.js
