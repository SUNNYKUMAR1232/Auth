import { Router, Request, Response, NextFunction } from 'express'
import AuthRoute from './auth.routes'
import loadEnvironmentVariables from '../config/env.config'
import { isLoggedIn } from '@src/controllers/auth.controller'
loadEnvironmentVariables()






export class GlobalRoutes {
  private readonly router: Router

  constructor() {
    this.router = Router()
    this.registerRoutes()
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
    this.router.use('/auth/register', (_req: Request, res: Response) => {
      res.render('register', {
        title: 'register',
        apiHost: process.env.API_HOST,
        assetsPath: '/api/public'
      })
    })
    this.router.use('/auth/login', (_req: Request, res: Response) => {
      res.render('login', {
        title: 'login',
        apiHost: process.env.API_HOST,
        assetsPath: '/api/public'
      })
    })
    this.router.use(
      '/auth/profile',
      isLoggedIn,
      (req: Request, res: Response) => {
        if (req.isAuthenticated()) {
          return res.render('profile', { title: 'profile', user: req.user })
        }
        res.redirect('/api/v1/auth/profile')
      }
    )
    this.router.use(
      '/auth/logout',
      isLoggedIn,
      (req: Request, res: Response) => {
        req.logout((err) => {
          if (err) {
            return res.status(500).json({ message: 'Logout failed', error: err })
          }
          res.redirect('/api/v1/auth/login')
        })
      }
    )
    this.router.use(
      '/*',
      isLoggedIn,
      (req: Request, res: Response, next: NextFunction) => {
        next()
      }
    )
  }
  getRoutes() {
    return this.router
  }
}
