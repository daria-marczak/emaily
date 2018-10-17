const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");

const keys = require("../config/keys");

const User = mongoose.model("users");
// We can pull something out of mongoose using only one argument in this function. Two arguments (as in models/User) means we are going to load something into it

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
		},
		(accessToken, refreshToken, profile, done) => {
			new User({ googleID: profile.id }).save();
			// This creates a new record (instance) of a user. This does not save this to the database. It only exists in the express API
			// only the method .save() will save it to the database
		}
	)
);