let curDir = ["~"];

const promptName = function () {
  return "tell " + curDir.at(-1) + " % ";
};

const echo = function (args) {
  return args.join(" ");
};

const changeDirectory = function ([curPath]) {
  curDir = curDir.concat(curPath.split("/"));
};

const runCommand = function (command, args) {
  switch (command) {
    case "echo":
      return echo(args);
    case "cd":
      return changeDirectory(args);
  }
};

const displayMessage = function (message) {
  if (message) {
    console.log(message);
  }
};

const runShell = function () {
  while (true) {
    const commandToRun = prompt(promptName());
    const [command, ...args] = commandToRun.split(" ");

    displayMessage(runCommand(command, args));
  }
};

runShell();