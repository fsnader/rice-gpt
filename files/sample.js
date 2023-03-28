function addTwoNumbers(a, b) {
  if (!a) {
    throw new Error("Provide a");
  }

  if (!b) {
    throw new Error("provide b");
  }

  return a + b;
}

module.exports = addTwoNumbers;
