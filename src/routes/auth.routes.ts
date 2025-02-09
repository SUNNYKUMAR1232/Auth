import { Router, Request, Response, NextFunction } from 'express'
import { AuthController } from '../controllers/controller'
import { IAuthRoute } from '../interfaces/auth.interface'
import PassportService, { providers } from '../services/passport.service'

class AuthRoute implements IAuthRoute {
  private readonly passport = new PassportService()
  private readonly authController: AuthController
  private router: Router

  constructor() {
    this.router = Router()
    this.authController = new AuthController()
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
    this.router.get('/logout', this.wrapAsync(this.authController.Logout))
    this.router.get(
      '/github',
      this.passport.getLogin(providers.GITHUB.name, providers.GITHUB.scope)
    )
    this.router.get(
      '/github/callback',
      this.passport.getCallback(providers.GITHUB.name, '/api/v1/auth/profile'),
      (req, res) => {
        res.redirect('/api/v1/auth')
      }
    )
  }

  public async GoogleAuth(): Promise<void> {
    // Implement Google Auth
    this.router.get(
      '/google',
      this.passport.getLogin(providers.GOOGLE.name, providers.GOOGLE.scope)
    )
    this.router.get(
      '/google/callback',
      this.passport.getLogin(providers.GOOGLE.name, providers.GOOGLE.scope),
      (req, res) => {
        res.redirect('/api/v1/auth/profile')
      }
    )
  }
  public async FacebookAuth(): Promise<void> {
    // Implement Facebook Auth
  }
  public async TwitterAuth(): Promise<void> {
    // Implement Twitter Auth
    this.router.get(
      '/twitter',
      this.passport.getLogin(providers.TWITTER.name, providers.TWITTER.scope)
    )
    this.router.get(
      '/twitter/callback',
      this.passport.getLogin(providers.TWITTER.name, providers.TWITTER.scope),
      (req, res) => {
        res.redirect('/api/v1/auth/profile')
      }
    )
  }
  public async LinkedinAuth(): Promise<void> {
    // Implement Linkedin Auth
  }
  private wrapAsync(fn: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
      Promise.resolve(fn(req, res, next)).catch(next)
    }
  }

  public getRoutes(): Router {
    return this.router
  }
}

export default AuthRoute
