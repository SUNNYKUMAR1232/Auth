import { Router } from 'express'
import loadEnvironmentVariables from '../config/env.config'
loadEnvironmentVariables()
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET,
  LINKEDIN_CALLBACK_URL,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK_URL,
  TWITTER_CLIENT_ID,
  TWITTER_CLIENT_SECRET,
  TWITTER_CALLBACK_URL
} = process.env

enum AuthProviders {
  GITHUB = 'GITHUB',
  GOOGLE = 'GOOGLE',
  LINKEDIN = 'LINKEDIN',
  FACEBOOK = 'FACEBOOK',
  TWITTER = 'TWITTER'
}

type OAuthProvider = {
  name: string
  scope: string[]
  clientID?: string
  clientSecret?: string
  consumerKey?: string
  consumerSecret?: string
  callbackURL: string
}

const providers: { [key in AuthProviders]: OAuthProvider } = {
  [AuthProviders.GITHUB]: {
    name: 'github',
    scope: ['user:email'],
    clientID: GITHUB_CLIENT_ID.toString(),
    clientSecret: GITHUB_CLIENT_SECRET.toString(),
    callbackURL: GITHUB_CALLBACK_URL.toString()
  },
  [AuthProviders.GOOGLE]: {
    name: 'google',
    scope: ['email', 'profile'],
    clientID: GOOGLE_CLIENT_ID.toString(),
    clientSecret: GOOGLE_CLIENT_SECRET.toString(),
    callbackURL: GOOGLE_CALLBACK_URL.toString()
  },
  [AuthProviders.LINKEDIN]: {
    name: 'linkedin',
    scope: ['r_emailaddress', 'r_liteprofile'],
    clientID: LINKEDIN_CLIENT_ID.toString(),
    clientSecret: LINKEDIN_CLIENT_SECRET.toString(),
    callbackURL: LINKEDIN_CALLBACK_URL.toString()
  },
  [AuthProviders.FACEBOOK]: {
    name: 'facebook',
    scope: ['email'],
    clientID: FACEBOOK_CLIENT_ID.toString(),
    clientSecret: FACEBOOK_CLIENT_SECRET.toString(),
    callbackURL: FACEBOOK_CALLBACK_URL.toString()
  },
  [AuthProviders.TWITTER]: {
    name: 'twitter',
    scope: ['email'],
    consumerKey: TWITTER_CLIENT_ID.toString(),
    consumerSecret: TWITTER_CLIENT_SECRET.toString(),
    callbackURL: TWITTER_CALLBACK_URL.toString()
  }
}

interface IAuthRoute {
  initRoutes(): Promise<void>
  GithubAuth(): Promise<void>
  GoogleAuth(): Promise<void>
  getRoutes(): Router
}

export { providers, AuthProviders, OAuthProvider, IAuthRoute }
