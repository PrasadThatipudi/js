const homeDirectory = "~";
const currentDirectory = [homeDirectory];
const directories = [homeDirectory, "workspace", "js", "practice"];

const promptMessage = function () {
  return "tell " + currentDirectory.at(-1) + " % ";
};

const echo = function (command, args) {
  return args.join(" ");
};

const isChildFolder = function (curDir) {
  return function (folder) {
    const index = directories.indexOf(curDir);
    curDir = directories[index + 1];

    return directories[index + 1] === folder;
  };
};

const isPathValid = function (path) {
  return path.split("/").every(isChildFolder(currentDirectory.at(-1)));
};

const fileNotFoundMessage = function (command, path) {
  return command + ": no such file or directory: " + path;
};

const safePop = function (array, elementToSave) {
  array.at(-1) !== elementToSave && array.pop();
};

const getCurrentDirectory = function (givenPath) {
  const path = givenPath.split("/");

  for (const directory of path) {
    directory === ".." ? safePop(currentDirectory, homeDirectory) :
      currentDirectory.push(directory);
  }
};

const changeDirectory = function (command, [path]) {
  return getCurrentDirectory(path);
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