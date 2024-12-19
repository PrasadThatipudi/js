const curDir = "~";
const promptName = "nutshell " + curDir + " % ";

const runCommand = function ([command, ...args]) {
  console.log("command:", command, "args:", args);
};

const runShell = function () {
  while (true) {
    const commandToRun = prompt(promptName);
    runCommand(commandToRun.split(" "));
  }
};

runShell();