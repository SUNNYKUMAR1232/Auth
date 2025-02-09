import { Router, Request, Response, NextFunction } from 'express'
import AuthRoute from './auth.routes'
import AuthController from '../controllers/auth.controller'
import loadEnvironmentVariables from '../config/env.config'
loadEnvironmentVariables()
export class GlobalRoutes {
  private readonly router: Router
  private readonly authContoller: AuthController

  constructor() {
    this.router = Router()
    this.registerRoutes()
    this.authContoller = new AuthController()
  }
  private isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/api/v1/auth/login')
  }
  private registerRoutes() {
    this.router.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({ status: 'OK' })
    })
    this.router.get('/', (_req: Request, res: Response) => {
      res.status(200).json({ message: 'Welcome to the API' })
    })
    this.router.use('/auth/', new AuthRoute().getRoutes())
    // Add more routes here
    this.router.use('/auth/login', (_req: Request, res: Response) => {
      res.render('login', {
        title: 'login',
        apiHost: process.env.API_HOST,
        assetsPath: '/api/public'
      })
    })
    this.router.use(
      '/auth/profile',
      this.isAuthenticated,
      (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
          return res.render('profile', { title: 'profile', user: req.user })
        }
        res.redirect('/api/v1/auth/profile')
      }
    )
    this.router.use(
      '/*',
      this.isAuthenticated.bind(this),
      (req: Request, res: Response, next: NextFunction) => {
        next()
      }
    )
  }
  getRoutes() {
    return this.router
  }
}
