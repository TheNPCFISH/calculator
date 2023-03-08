let result = document.getElementById('result');

function getResult(value) {
  if (value === '=') {
    result.value = eval(result.value);
  } else {
    result.value += value;
  }
}

function clearAll() {
  result.value = '';
}

function removeLastChar() {
  result.value = result.value.slice(0, -1);
}
