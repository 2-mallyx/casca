console.log("Child process started");
console.error("This is an error message from the child");

// Handle messages from parent
process.on("message", (message) => {
  console.log("Message from parent:", message);
  // Send a message back to the parent
  process.send({ foo: "bar" });
});

// Simulate some async work
setInterval(() => {
  console.log("Child is still running...");

  vzgbhunm;
}, 1000);

// Handle disconnect event
process.on("disconnect", () => {
  console.log("Parent has disconnected");
});
