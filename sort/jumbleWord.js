const word = prompt("Enter a word: ");
// console.clear();

const randomOrder = function () {
  return Math.random() - 0.5;
};

const jumbleWord = function (word) {
  return word.split("").sort(randomOrder).join("");
};

console.log(jumbleWord(word));