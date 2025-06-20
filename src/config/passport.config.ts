/**
 * @author Sunny Kumar
 * @date 2023-10-01
 * @file Passport configuration for social authentication
 * @module config/passport.config
 * @description This module sets up passport strategies for social authentication.
 */

import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GitHubStrategy } from 'passport-github2'
import { Strategy as TwitterStrategy } from 'passport-twitter'
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2'
import { configureStrategy } from '../services/passport.service'
import { providers, SocalProviders } from '../interfaces/auth.interface'

export const setupPassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
  configureStrategy(SocalProviders.GOOGLE, GoogleStrategy, providers.GOOGLE,
  true
)
//   configureStrategy(SocalProviders.FACEBOOK, FacebookStrategy, providers.FACEBOOK,
//   true
// )
  configureStrategy(SocalProviders.GITHUB, GitHubStrategy, providers.GITHUB,
  true
)
//   configureStrategy(SocalProviders.TWITTER, TwitterStrategy, providers.TWITTER,
//   true
// )
//   configureStrategy(SocalProviders.LINKEDIN, LinkedInStrategy, providers.LINKEDIN,
//   true
// )
}
