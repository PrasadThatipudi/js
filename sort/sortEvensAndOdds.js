const isEven = function (num1) {
  return (num1 & 1) === 0;
};

const ascendingComparator = function (a, b) {
  return a - b;
};

const evenOddComparator = function (a, b) {
  return (b % 2) - (a % 2);
};

const evenOddAscendingComparator = function (a, b) {
  const comparator = isEven(a) === isEven(b) ? ascendingComparator :
    evenOddComparator;

  return comparator(a, b);
};

const sortEvensAndOdds = function (...numbers) {
  return numbers.sort(evenOddAscendingComparator);
};

sortEvensAndOdds(7, 8, 2, 5, 6);