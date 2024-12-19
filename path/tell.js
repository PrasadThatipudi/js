let currentDirectory = "~";
const directories = ["~", "workspace"];

const promptMessage = function () {
  return "tell " + currentDirectory + " % ";
};

const echo = function (command, args) {
  return args.join(" ");
};

const isChildFolder = function (folder) {
  const index = directories.indexOf(currentDirectory);

  return directories[index + 1] === folder;
};

const isPathValid = function (path) {
  return path.split("/").every(isChildFolder);
};

const fileNotFoundMessage = function (command, path) {
  return command + ": no such file or directory: " + path;
};

const changeDirectory = function (command, [path]) {
  if (!isPathValid(path)) {
    return fileNotFoundMessage("cd", path);
  }

  currentDirectory = path.at(-1);
};

const commandNotFoundErr = function (command) {
  return "zsh: command not founnd: " + command;
};

const getCommandFunction = function (givenCommand) {
  return function (initFn, [command, fnReference]) {
    return command === givenCommand ? fnReference : initFn;
  };
};

const runCommand = function (command, args) {
  const commands = [
    ["echo", echo],
    ["cd", changeDirectory]
  ];

  return commands.reduce(getCommandFunction(command), commandNotFoundErr)
    (command, args);
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