const passport = require("passport");
const GithubStrategy = require("passport-github2");

const User = require("../models/User");

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
} = require("../config");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id, "name email _id");
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ githubId: profile.id });

        if (user) {
          return done(null, user);
        } else {
          const newUser = new User({
            email: profile.email,
            name: profile.displayName,
            githubId: profile.id,
          });

          const savedUser = await newUser.save();

          done(null, savedUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

module.exports = passport;