// Program to reverse the given number

const number = 1212;

let reversedNumber = 0;
let remainder = number;
let digitOfNumber = 0;

while (remainder > 0) {
    // console.log(remainder);
    digitOfNumber = remainder % 10;
    reversedNumber = (reversedNumber * 10) + digitOfNumber;
    remainder = (remainder - (remainder % 10)) / 10;
}

console.log(reversedNumber);