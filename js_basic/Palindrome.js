// Program to find whether the given number is palindrome or not

const number = 1221;

let reversedNumber = 0;
let remainder = number;
let digitOfNumber = 0;
let isPalindrome = false;

while (remainder > 0) {
    digitOfNumber = remainder % 10;
    reversedNumber = (reversedNumber * 10) + digitOfNumber;
    remainder = (remainder - (remainder % 10)) / 10;
}

// console.log(reversedNumber);

if (number === reversedNumber) {
    isPalindrome = true;
}

console.log(isPalindrome);