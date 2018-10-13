const express = require("express"); // CommonJS modules. The "import" is ES2015 modules syntax

const app = express();

// We might have several express applications in one app

app.get("/", (req, res) => {
  res.send({ hi: "there" });
});

// Whenever heroku runs our app, it has the ability to inject environment variables. Env variables are set in the underline runtime in Node. Heroku has the ability of pass us runtime configuration. It says: look at the underline environment and verify which port we should use.
// However in the development environment, this can be undefined.
const PORT = process.env.PORT || 5000;
app.listen(PORT);