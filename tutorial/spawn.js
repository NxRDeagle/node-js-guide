const { spawn } = require("child_process");

const workerProcess = spawn("dir", [], { shell: true }); // add options to execute command in a shell

workerProcess.stdout.on("data", function (data) {
  console.log("stdout: " + data);
});

workerProcess.stderr.on("data", function (data) {
  console.log("stderr: " + data);
});

workerProcess.on("close", function (code) {
  console.log("child process exited with code " + code);
});
