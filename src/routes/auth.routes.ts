import { Router } from 'express'
import {logout} from '../controllers/auth.controller'
import { wrapAsync } from '../utils/warapAsync'
import { IAuthRoute, providers } from '../interfaces/auth.interface'
import { getCallback, getLogin } from '@src/services/passport.service'


class AuthRoute implements IAuthRoute {
  private router: Router

  constructor() {
    this.router = Router()
    this.initRoutes()
  }

  public async initRoutes(): Promise<void> {
    await this.GithubAuth()
    await this.GoogleAuth()
    await this.FacebookAuth()
    await this.TwitterAuth()
    await this.LinkedinAuth()
  }

  public async GithubAuth(): Promise<void> {
    this.router.get('/logout', wrapAsync(logout))
    
    this.router.get(
      '/github',
      getLogin(providers.GITHUB.name, providers.GITHUB.scope)
    )
    this.router.get(
      '/github/callback',
      getCallback(providers.GITHUB.name, '/api/v1/auth/profile'),
      (_, res) => {
        res.redirect('/api/v1/auth')
      }
    )
  }

  public async GoogleAuth(): Promise<void> {
    // Implement Google Auth
    this.router.get(
      '/google',
      getLogin(providers.GOOGLE.name, providers.GOOGLE.scope)
    )
    this.router.get(
      '/google/callback',
      getLogin(providers.GOOGLE.name, providers.GOOGLE.scope),
      (_, res) => {
        res.redirect('/api/v1/auth/profile')
      }
    )
  }
  public async FacebookAuth(): Promise<void> {
    // Implement Facebook Auth
    this.router.get(
      '/facebook',
      getLogin(providers.FACEBOOK.name, providers.FACEBOOK.scope)
    )
    this.router.get(
      '/facebook/callback',
      getLogin(providers.FACEBOOK.name, providers.FACEBOOK.scope),
      (_, res) => {
        res.redirect('/api/v1/auth/profile')
      }
    )
  }
  public async TwitterAuth(): Promise<void> {
    // Implement Twitter Auth
    this.router.get(
      '/twitter',
      getLogin(providers.TWITTER.name, providers.TWITTER.scope)
    )
    this.router.get(
      '/twitter/callback',
      getLogin(providers.TWITTER.name, providers.TWITTER.scope),
      (_, res) => {
        res.redirect('/api/v1/auth/profile')
      }
    )
  }
  public async LinkedinAuth(): Promise<void> {
    // Implement Linkedin Auth
    this.router.get(
      '/linkedin',
      getLogin(providers.LINKEDIN.name, providers.LINKEDIN.scope)
    )
    this.router.get(
      '/linkedin/callback',
      getLogin(providers.LINKEDIN.name, providers.LINKEDIN.scope),
      (_, res) => {
        res.redirect('/api/v1/auth/profile')
      }
    )
  }


  public getRoutes(): Router {
    return this.router
  }
}

export default AuthRoute
