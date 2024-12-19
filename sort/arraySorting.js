const ascendingOrder = function (a, b) {
  return a - b;
};

const sortArray = function (array) {
  if (!Array.isArray(array[0])) {
    return array.sort(ascendingOrder);
  }

  for (const index in array) {
    sortArray(array[index]);
  }

  return array;
};