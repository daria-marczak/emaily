const express = require('express'); // CommonJS modules. The "import" is ES2015 modules syntax
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const keys = require('./config/keys');

// We might have several express applications in one app
const app = express();

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		accessToken => {
			console.log(accessToken);
		}
	)
);

app.get(
	'/auth/google', // The user that comes in on the route needs to be authenticated with passport using the Google Strategy
	passport.authenticate('google', {
		scope: ['profile', 'email'], // Scope specifies to Google what access we want to have. We're asking Google to give us access to profile and email information
	})
);

// Whenever heroku runs our app, it has the ability to inject environment variables. Env variables are set in the underline runtime in Node. Heroku has the ability of pass us runtime configuration. It says: look at the underline environment and verify which port we should use.
// However in the development environment, this can be undefined.
const PORT = process.env.PORT || 5000;
app.listen(PORT);
