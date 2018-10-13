const express = require("express"); // CommonJS modules. The "import" is ES2015 modules syntax

const app = express();

// We might have several express applications in one app

app.get("/", (req, res) => {
  res.send({ hi: "there" });
}); // Route handler in express

app.listen(5000);