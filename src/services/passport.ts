import passport from "passport";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";
import { UserDto } from "../dtos/user.dto";
import { UserDtoParams } from "../dtos/user.dto";
import "../config/envConfig";

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} = process.env;

export enum AuthProviders {
  GITHUB = "GITHUB",
  GOOGLE = "GOOGLE",
}

type OAuthProvider = {
  name: string;
  scope: string[];
  clientID: string;
  clientSecret: string;
  callbackURL: string;
};

const providers: { [key in AuthProviders]: OAuthProvider } = {
  [AuthProviders.GITHUB]: {
    name: "github",
    scope: ["user:email"],
    clientID: GITHUB_CLIENT_ID.toString(),
    clientSecret: GITHUB_CLIENT_SECRET.toString(),
    callbackURL: GITHUB_CALLBACK_URL.toString(),
  },
  [AuthProviders.GOOGLE]: {
    name: "google",
    scope: ["email", "profile"],
    clientID: GOOGLE_CLIENT_ID.toString(),
    clientSecret: GOOGLE_CLIENT_SECRET.toString(),
    callbackURL: GOOGLE_CALLBACK_URL.toString(),
  },
};

class PassportService {
  constructor() {
    this.initialize();
  }
  private initialize() {
    this.setupSerialization();
    this.configureStrategy(
      AuthProviders.GITHUB,
      GithubStrategy,
      providers[AuthProviders.GITHUB],
      false
    );
    this.configureStrategy(
      AuthProviders.GOOGLE,
      GoogleStrategy,
      providers[AuthProviders.GOOGLE],
      true
    );
  }

  private setupSerialization() {
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    passport.deserializeUser(function (user, done) {
      done(null, user);
    });
  }
  private configureStrategy(
    provider: AuthProviders,
    Strategy: any,
    providerConfig: OAuthProvider,
    passReqToCallback: boolean = false
  ) {
    passport.use(
      new Strategy(
        {
          clientID: providerConfig.clientID,
          clientSecret: providerConfig.clientSecret,
          callbackURL: providerConfig.callbackURL,
          passReqToCallback,
        },
        async (req, accessToken, refreshToken, profile, done) => {
          return this.saveUser(
            provider,
            accessToken,
            refreshToken,
            profile,
            done
          );
        }
      )
    );
  }
  private async saveUser(
    provider: AuthProviders,
    accessToken: string,
    refreshToken: string,
    profile,
    done
  ) {
    try {
      const user = await User.findOne({
        [`${provider.toLowerCase()}Id`]: profile.id,
      });

      if (user) {
        return done(null, user);
      } else {
        const userData: UserDtoParams = {
          name: profile.displayName,
          email: profile.emails[0].value,
          githubId: provider === AuthProviders.GITHUB ? profile.id : undefined,
          googleId: provider === AuthProviders.GOOGLE ? profile.id : undefined,
          image: profile.photos ? profile.photos[0].value : undefined,
        };
        const userDto = new UserDto(userData);

        // Validate user data
        const validationResult = UserDto.validate(userDto);
        if (validationResult.error) {
          return done(validationResult.error);
        }

        const newUser = new User(userDto);
        const savedUser = await newUser.save();
        return done(null, savedUser);
      }
    } catch (error) {
      return done(error);
    }
  }
  public getPassport() {
    return passport;
  }

  public getLogin(name: string, scope: string[]) {
    return passport.authenticate(name, { scope });
  }

  public getCallback(
    name: string,
    failureRedirect?: string,
    successRedirect?: string
  ) {
    return passport.authenticate(name, { failureRedirect, successRedirect });
  }
}

export default PassportService;

export { providers };

/* 
 githubId: profile.id,
        fullname: profile.displayName,
        username: profile.username,
        location: profile._json.location,
        phone: profile._json.phone,
        email: profile._json.email,
        profilePhoto: profile._json.avatar_url
*/
