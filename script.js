const gpu = new GPU();

const getResult = gpu.createKernel(function(input) {
  let result = '';
  if (input[this.thread.x] === '=') {
    result = eval(this.output[0]);
  } else {
    result = this.output[0] + input[this.thread.x];
  }
  return result;
}).setOutput([1]);

const clearAll = gpu.createKernel(function() {
  return '';
}).setOutput([1]);

const removeLastChar = gpu.createKernel(function(input) {
  return input.slice(0, -1);
}).setOutput([1]);
