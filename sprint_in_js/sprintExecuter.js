const readSprint = function () {
  const code = prompt("Paste your sprint program here: ").trim();
  return code.length === 0 ? readSprint() : code;
};

const removeAll = (array, culprit) =>
  array.filter((element) => element !== culprit);

const stringToNumber = (numbers) => numbers.map((number) => +number);

const put = function (value, targetCell, code, currentCell) {
  code[targetCell] = value;
  return currentCell + 3;
};

const copy = function (sourceCell, targetCell, code, currentCell) {
  return put(code[sourceCell], targetCell, code, currentCell);
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

const jumpIfEqual = function (cell1, cell2, targetCell, code, currentCell) {
  return code[cell1] === code[cell2] ? targetCell : currentCell + 4;
};

const jumpIfLessThan = function (cell1, cell2, targetCell, code, currentCell) {
  return code[cell1] < code[cell2] ? targetCell : currentCell + 4;
};

const getCurrentInstruction = function (currentInstruction, instructions) {
  return instructions.find(
    ({ instruction }) => instruction === currentInstruction
  );
};

const halt = 9;

const isInstructionValid = function (curInstruction, instructions) {
  return instructions.some(({ instruction }) => curInstruction === instruction);
};

const eofStatus = function (currentInstruction, instructions) {
  if (currentInstruction === halt) {
    return [true, ""];
  }

  if (!isInstructionValid(currentInstruction, instructions)) {
    return [
      true,
      "InstructionNotFound:" + currentInstruction + " is not an instruction!",
    ];
  }

  return [false, ""];
};

const executeCode = function (instructions, code, currentCell) {
  const curInstruction = code[currentCell];
  const [isExecutionEnded, err] = eofStatus(curInstruction, instructions);

  if (isExecutionEnded) {
    return [err, code];
  }

  const { noOfArgs, fn: instructionToExecute } = getCurrentInstruction(
    curInstruction,
    instructions
  );

  const args = code.slice(currentCell + 1, currentCell + noOfArgs + 1);

  return executeCode(
    instructions,
    code,
    instructionToExecute(...args, code, currentCell)
  );
};

const sprintExecuter = function (code) {
  const instructions = [
    { instruction: 0, fn: put, noOfArgs: 2 },
    { instruction: 7, fn: copy, noOfArgs: 2 },
    { instruction: 3, fn: jump, noOfArgs: 1 },
    { instruction: 1, fn: add, noOfArgs: 3 },
    { instruction: 2, fn: sub, noOfArgs: 3 },
    { instruction: 5, fn: jumpIfLessThan, noOfArgs: 3 },
    { instruction: 4, fn: jumpIfEqual, noOfArgs: 3 },
  ];

  return executeCode(instructions, code, 1);
};

const arrayToObject = (obj, number, index) => ({ ...obj, [index]: number });
const convertToObject = (numbers) => numbers.reduce(arrayToObject, {});

const main = function () {
  const codeInString = readSprint().split(" ");
  const code = stringToNumber(removeAll(codeInString, ""));

  // console.log([, ...code]);
  const [errors, resultCode] = sprintExecuter([, ...code]);
  if (errors) console.log(errors);

  return [convertToObject(resultCode)];
};

console.table(main());

// ----------------- Testing Fragment -------------------

const testCases = [
  [removeAll, [["1", "2", "2", "3"], "2"], ["1", "3"]],
  [removeAll, [[" ", "h", "b", "", " "], " "], ["h", "b", ""]],
  [removeAll, [["a", "b", "c"], "d"], ["a", "b", "c"]],

  [stringToNumber, [["1", "2", "3"]], [1, 2, 3]],
  [stringToNumber, [["-2", "89", "-34"]], [-2, 89, -34]],
  // [stringToNumber, [["a", "b"]], [NaN, NaN]],

  [cumulativeSum, [[]], []],
  [cumulativeSum, [[1]], [1]],
  [cumulativeSum, [[1, 3, 5]], [1, 4, 9]],
  [cumulativeSum, [[1, 1, 1, 1, 1]], [1, 2, 3, 4, 5]],

  [rangeArray, [2], [1, 1]],
  [rangeArray, [0], []],

  [range, [0, 4], [0, 1, 2, 3]],
  [range, [1, 4], [1, 2, 3]],

  [put, [34, 1, [, 0, 34, 1, 9], 1], 4],
  [put, [4, 2, [, 0, 34, 1, 0, 4, 2, 9], 4], 7],
];

import { testExecuter } from "../../../assignments/test_framework/test.js";
// testExecuter(testCases);
