const readSprint = function () {
  return prompt("Paste your sprint program here: ");
};

const stringToArray = function (string, separator) {
  if (string.trim().length === 0) {
    return [];
  }

  return string.split(separator);
};

// ----------------- Testing Fragment -------------------
const getTestResult = function ([functionName, params, expected]) {
  const actual = functionName(...params);

  return [functionName, params, expected, actual];
};

const isTestFailed = function ([functionName, params, expected, actual]) {

  return actual !== expected;
};

const testExecuter = function (testCases) {
  const failed = testCases.map(getTestResult).filter(isTestFailed);

  console.table(failed);
};

const testCases = [
  [stringToArray, ["1 2 3", " "], ["1", "2", "3"]],
  [stringToArray, ["", " "], []]
];

testExecuter(testCases);
