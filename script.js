function getResult(value) {
  var result = document.getElementById("result");
  if (value === "=") {
    result.value = eval(result.value);
  } else if (value === "C") {
    result.value = "";
  } else {
    result.value += value;
  }
  result.style.fontSize = Math.max(12, Math.min(48, 240 / result.value.length)) + "px";
}

window.addEventListener("resize", function() {
  var result = document.getElementById("result");
  result.style.fontSize = Math.max(12, Math.min(48, 240 / result.value.length)) + "px";
});
