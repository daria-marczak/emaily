const passport = require('passport');

module.exports = (app) => {
  app.get(
    '/auth/google', // The user that comes in on the route needs to be authenticated with passport using the Google Strategy
    passport.authenticate('google', {
      scope: ['profile', 'email'], // Scope specifies to Google what access we want to have. We're asking Google to give us access to profile and email information
    })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    res.send(req.user); // We receive the user as it is in Mongo
  });
}

// We are exporting a function from here so that it has index's app instance access