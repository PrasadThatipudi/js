const curDir = "~";
const promptName = "tell " + curDir + " % ";

const echo = function (args) {
  return args.join(" ");
};

const runCommand = function (command, args) {
  switch (command) {
    case "echo":
      return echo(args);
  }
};

const runShell = function () {
  while (true) {
    const commandToRun = prompt(promptName);
    const [command, ...args] = commandToRun.split(" ");

    console.log(runCommand(command, args));
  }
};

runShell();