const hasGPU = () => {
  try {
    const gpu = new GPU();
    return true;
  } catch (e) {
    return false;
  }
}

let getResult, clearAll, removeLastChar;

if (hasGPU()) {
  const gpu = new GPU();
  getResult = gpu.createKernel(function(input) {
    let result = '';
    if (input[this.thread.x] === '=') {
      result = eval(this.output[0]);
    } else {
      result = this.output[0] + input[this.thread.x];
    }
    return result;
  }).setOutput([1]);

  clearAll = gpu.createKernel(function() {
    return '';
  }).setOutput([1]);

  removeLastChar = gpu.createKernel(function(input) {
    return input.slice(0, -1);
  }).setOutput([1]);
} else {
  getResult = (input) => {
    let result = '';
    if (input === '=') {
      result = eval(result.value);
    } else {
      result = result.value + input;
    }
    return result;
  }

  clearAll = () => {
    result.value = '';
  }

  removeLastChar = () => {
    result.value = result.value.slice(0, -1);
  }
}
