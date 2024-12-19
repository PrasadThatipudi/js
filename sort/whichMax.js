const descendingOrder = function (num1, num2) {
  return num2 - num1;
};

const nthLargest = function (rank) {
  return function (...numbers) {
    if (numbers.length < rank) {
      return -Infinity;
    }

    const sortedNumbers = [...numbers];
    sortedNumbers.sort(descendingOrder);
    return sortedNumbers[rank - 1];
  };
};

const stringToNumber = function (number) {
  return +number;
};

const readInt = function (message) {
  return stringToNumber(prompt(message + ": "));
};

const readString = function (message) {
  return prompt(message + ": ");
};

const readStudentNames = function (noOfStudents) {
  return Array(noOfStudents).fill("Enter student name").map(readString);
};

const numbers = readArrayOfNumbers();
const rank = prompt("Enter the rank do you want to see:");

console.log(nthLargest(rank)(...numbers));