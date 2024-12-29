const areEqual = function (lhs, rhs) {
  if (!(lhs instanceof Object)) {
    return Object.is(lhs, rhs) || lhs === rhs;
  }

  if (lhs instanceof Object !== rhs instanceof Object) return false;

  if (Object.keys(lhs).length !== Object.keys(rhs).length) return false;

  return Object.entries(lhs).every(
    ([key, value]) => key in rhs && areEqual(value, rhs[key])
  );
};

const getTestResult = function ([functionName, args, expected]) {
  const actual = functionName(...args);

  return { functionName, args, expected, actual };
};

const isTestFailed = function ({ expected, actual }) {
  return !areEqual(actual, expected);
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

export const testExecuter = function (testCases) {
  const testResult = testCases.map(getTestResult);
  const failed = testResult.filter(isTestFailed);
  const passed = testResult.filter(isTestPassed);

  displayTestResult(failed);
  displayPassedTests(passed);
};
