const cumulativeSumReducer = function (numbers, number) {
  const nextNum = numbers.at(-1) + number || number;
  return [...numbers, nextNum];
};

const cumulativeSum = (numbers) => numbers.reduce(cumulativeSumReducer, []);
const rangeArray = (noOfOnes) => Array(noOfOnes).fill(1);
const range = (from, to) => cumulativeSum([from, ...rangeArray(to - from - 1)]);

const readSprint = function () {
  const code = prompt("Paste your sprint program here: ").trim();
  return code.length === 0 ? readSprint() : code;
};

const removeAll = (array, culprit) =>
  array.filter((element) => element !== culprit);

const stringToNumber = (numbers) => numbers.map((number) => +number);

const arrayToObject = (obj, number, index) => ({ ...obj, [index + 1]: number });
const convertToObject = (numbers) => numbers.reduce(arrayToObject, {});

const put = function (value, targetCell, code, currentCell) {
  code[targetCell] = value;
  return currentCell + 3;
};

const jump = (targetCell) => targetCell;
const add = function (cell1, cell2, targetCell, code, currentCell) {
  code[targetCell] = code[cell1] + code[cell2];

  return currentCell + 4;
};

const sub = function (cell1, cell2, targetCell, code, currentCell) {
  code[targetCell] = code[cell1] - code[cell2];
  return currentCell + 4;
};

const getValuesOfKeys = (object, keys) => keys.map((key) => object[key]);
const executeInstruction = function (code, instruction, args, curCell) {
  return instruction(...args, code, curCell);
};

const getCurrentInstruction = function (currentInstruction) {
  const instructions = [
    { instruction: 0, fn: put, noOfArgs: 2 },
    { instruction: 3, fn: jump, noOfArgs: 1 },
    { instruction: 1, fn: add, noOfArgs: 3 },
    { instruction: 2, fn: sub, noOfArgs: 3 },
  ];
  return instructions.find(
    ({ instruction }) => instruction === currentInstruction
  );
};

const sprintExecuter = function (code) {
  const halt = 9;
  let curCell = 1;

  while (code[curCell] !== halt) {
    const { noOfArgs, fn: instructionToExecute } = getCurrentInstruction(
      code[curCell]
    );

    const keyValuesOfArguments = range(curCell + 1, curCell + noOfArgs + 1);
    const args = getValuesOfKeys(code, keyValuesOfArguments);

    curCell = executeInstruction(code, instructionToExecute, args, curCell);
  }

  return code;
};

const main = function () {
  const codeInString = readSprint();
  const code = stringToNumber(removeAll(codeInString.split(" "), ""));

  return sprintExecuter(convertToObject(code));
};

console.log(main());

// ----------------- Testing Fragment -------------------
const areEqual = function (element1, element2) {
  return element1 === element2;
};

const areArraysEqual = function (element1, element2) {
  if (!Array.isArray(element1)) {
    return areEqual(element1, element2);
  }

  if (!areEqual(element1.length, element2.length)) {
    return false;
  }

  for (const index in element1) {
    if (!areArraysEqual(element1[index], element2[index])) {
      return false;
    }
  }

  return true;
};

const getTestResult = function ([functionName, params, expected]) {
  const actual = functionName(...params);

  return [functionName, params, expected, actual];
};

const isTestFailed = function ([functionName, params, expected, actual]) {
  return !areArraysEqual(actual, expected);
};

const complement = function (functionRef) {
  return function (...args) {
    return !functionRef(...args);
  };
};

const isTestPassed = function (testResult) {
  return complement(isTestFailed)(testResult);
};

const displayTestResult = function (failed) {
  if (failed.length === 0) {
    console.log("All tests passed!");
    return;
  }

  console.table(failed);
};

const displayPassedTests = function (passed) {
  if (confirm("Do you want to see passed tests?")) {
    console.table(passed);
  }
};

const testExecuter = function (testCases) {
  const testResult = testCases.map(getTestResult);
  const failed = testResult.filter(isTestFailed);
  const passed = testResult.filter(isTestPassed);

  displayTestResult(failed);
  displayPassedTests(passed);
};

const testCases = [
  [removeAll, [["1", "2", "2", "3"], "2"], ["1", "3"]],

  [stringToNumber, [["1", "2", "3"]], [1, 2, 3]],
  [cumulativeSum, [[1, 1, 1, 1, 1]], [1, 2, 3, 4, 5]],
  [rangeArray, [2], [1, 1]],
  [range, [0, 4], [0, 1, 2, 3]],
  [range, [1, 4], [1, 2, 3]],
];

testExecuter(testCases);
