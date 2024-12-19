// Program to print given number of fibonacci numbers

let currentElement = 1;
let previousElement = 0;
let nextElement = 0;

const countOfElements = 2;

for (let count = 0; count < countOfElements; count++) {
    console.log(previousElement);
    nextElement = currentElement + previousElement;
    previousElement = currentElement;
    currentElement = nextElement;
}