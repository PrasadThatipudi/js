const readSprint = function () {
  const code = prompt("Paste your sprint program here: ").trim();
  return code.length === 0 ? readSprint() : code;
};

const removeAll = (array, culprit) =>
  array.filter((element) => element !== culprit);

const replaceLabelWithNumber = function (labels, number, index) {
  if (isNaN(number)) {
    return number.includes(":") ? +number.split(":")[1] : labels[number];
  }

  return +number;
};

const stringToNumber = function (numbers, labels) {
  return numbers.map((number, index) =>
    replaceLabelWithNumber(labels, number, index)
  );
};

const put = function (value, targetCell, code, currentCell) {
  code[targetCell] = value;
  return currentCell + 3;
};

const copy = (sourceCell, targetCell, code, currentCell) =>
  put(code[sourceCell], targetCell, code, currentCell);

const jump = (targetCell) => targetCell;

const arithmetics = function (
  lhsCell,
  rhsCell,
  targetCell,
  code,
  curCell,
  mapper
) {
  code[targetCell] = mapper(code[lhsCell], code[rhsCell]);
  return curCell + 4;
};

const addTwoNumbers = (a, b) => a + b;
const subTwoNumbers = (a, b) => a - b;
const isEqual = (a, b) => a === b;
const isLessThan = (a, b) => a < b;

const add = (lhsCell, rhsCell, resultCell, code, curCell) =>
  arithmetics(lhsCell, rhsCell, resultCell, code, curCell, addTwoNumbers);

const sub = (lhsCell, rhsCell, resultCell, code, curCell) =>
  arithmetics(lhsCell, rhsCell, resultCell, code, curCell, subTwoNumbers);

const jumpIf = function (
  lhsCell,
  rhsCell,
  resultCell,
  code,
  curCell,
  predicate
) {
  return predicate(code[lhsCell], code[rhsCell]) ? resultCell : curCell + 4;
};

const jumpIfEqual = (lhsCell, rhsCell, targetCell, code, currentCell) =>
  jumpIf(lhsCell, rhsCell, targetCell, code, currentCell, isEqual);

const jumpIfLessThan = (lhsCell, rhsCell, targetCell, code, currentCell) =>
  jumpIf(lhsCell, rhsCell, targetCell, code, currentCell, isLessThan);

const getCurrentInstruction = (currentInstruction, instructions) =>
  instructions.find(({ instruction }) => instruction === currentInstruction);

const halt = 9;

const isInstructionValid = (curInstruction, instructions) =>
  instructions.some(({ instruction }) => curInstruction === instruction);

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

  if (isExecutionEnded) return [err, code];

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

const getLabels = function (code) {
  return code
    .map((value, index) => [value, index])
    .filter(([label]) => label.includes(":"))
    .reduce(
      (labels, [label, cell]) => ({
        ...labels,
        [label.split(":")[0]]: cell,
      }),
      {}
    );
};

const main = function () {
  const codeInString = readSprint().split(" ");
  const code = [, ...removeAll(codeInString, "")];
  const labels = getLabels(code);

  const codeToBeExecuted = stringToNumber(code, labels);
  const [error, resultCode] = sprintExecuter(codeToBeExecuted);
  if (error) console.log(error);

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

  [put, [34, 1, [, 0, 34, 1, 9], 1], 4],
  [put, [4, 2, [, 0, 34, 1, 0, 4, 2, 9], 4], 7],
];

import { testExecuter } from "../../../assignments/test_framework/test.js";
testExecuter(testCases);
