const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");
// We can pull something out of mongoose using only one argument in this function. Two arguments (as in models/User) means we are going to load something into it

passport.serializeUser((user, done) => {
	done(null, user.id);
	// done is the callback we have to call. User.id is the identifying information
	// the id is actually the id assigned by mongo, not the google one
});

// It's more important to care about the ID from Mongo, as there can be many different authentication methods (Facebook, LinkedIn etc.)
// This creates a cookie for us to authenticate user in the app

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => {
			done(null, user);
		});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id })
				.then((existingUser) => {
					if (existingUser) {
						// We already have a record of this user
						done(null, existingUser);
						// Null means that everyting went well. Done is the argument provided by passport.
					} else {
						new User({ googleID: profile.id }).save()
							.then(user => done(null, user)); // We need to inform passport that the authentication is done
						// This creates a new record (instance) of a user. This does not save this to the database. It only exists in the express API
					// only the method .save() will save it to the database
					}
				});
			// User.findOne() does not return the user directly. It returns a promise
		}
	)
);