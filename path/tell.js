const curDir = ["~"];

const promptMessage = function () {
  return "tell " + curDir.at(-1) + " % ";
};

const echo = function (args) {
  return args.join(" ");
};

const changeDirectory = function ([curPath]) {
  const path = curPath.split("/");

  for (const directory of path) {
    directory === ".." ? curDir.pop() : curDir.push(directory);
  }
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
    const commandToRun = prompt(promptMessage());
    const [command, ...args] = commandToRun.split(" ");

    displayMessage(runCommand(command, args));
  }
};

runShell();