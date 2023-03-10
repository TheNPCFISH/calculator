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
      document.getElementById('result').value = result;
    } else {
      result = this.output[0] + input[this.thread.x];
      document.getElementById('result').value = result;
    }
    return result;
  }).setOutput([1]);

  clearAll = gpu.createKernel(function() {
    document.getElementById('result').value = '';
    return '';
  }).setOutput([1]);

  removeLastChar = gpu.createKernel(function(input) {
    const result = input.slice(0, -1);
    document.getElementById('result').value = result;
    return result;
  }).setOutput([1]);
} else {
  getResult = (input) => {
    let result = '';
    if (input === '=') {
      result = eval(document.getElementById('result').value);
      document.getElementById('result').value = result;
    } else {
      result = document.getElementById('result').value + input;
      document.getElementById('result').value = result;
    }
    return result;
  }

  clearAll = () => {
    document.getElementById('result').value = '';
  }

  removeLastChar = () => {
    const result = document.getElementById('result').value.slice(0, -1);
    document.getElementById('result').value = result;
  }
}
