const numbers = [1, 2, 3];

numbers.sort(
  function (a, b) {
    if (a > b) { return 1; }
    if (a === b) { return 0; }
    return -1;
  }
);