const { fork } = require("child_process");
const path = require("path");

function createChild() {
  const child = fork(path.join(__dirname, "app/child.js"), [], {
    stdio: ["pipe", "pipe", "pipe", "ipc"],
  });

  // Redirect child's stdout to parent
  child.stdout.on("data", (data) => {
    console.log(`Child stdout: ${data}`);
  });

  // Redirect child's stderr to parent
  child.stderr.on("data", (data) => {
    console.error(`Child stderr: ${data}`);
  });

  // Handle messages from child
  child.on("message", (message) => {
    console.log("Message from child:", message);
  });

  // Handle child online event
  child.on("online", () => {
    console.log("Child process is online");
  });

  // Handle child disconnect event
  child.on("disconnect", () => {
    console.log("Child process has disconnected");
  });

  // Handle child exit
  child.on("exit", (code, signal) => {
    if (code) console.log(`Child process exited with code ${code}`);
    if (signal) console.log(`Child process was killed with signal ${signal}`);
    console.log("Starting a new child process...");
    createChild(); // Restart the child
  });

  // Handle child error
  child.on("error", (error) => {
    console.error("Failed to start child process:", error);
  });

  // Handle child close
  child.on("close", (code, signal) => {
    console.log(`Child process closed. Code: ${code}, Signal: ${signal}`);
  });

  // Send a message to the child
  child.send({ hello: "world" });

  // Simulate disconnecting after 5 seconds
  setTimeout(() => {
    console.log("Disconnecting child...");
    child.disconnect();
  }, 5000);

  // Simulate killing the child after 10 seconds
  setTimeout(() => {
    console.log("Killing child...");
    child.kill("SIGTERM");
  }, 10000);
}

createChild();
