import express, { Application, Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
dotenv.config()
import loadEnvironmentVariables from './config/env.config'
import cors from 'cors'
import Database from './config/db.config'
import { GlobalRoutes } from './routes/routes'
import morganConfig from './config/morgan.config'
import CorsConfig from './config/cors.config'
import helmetConfig from './config/helmet.config'
import session from 'express-session'
import passport from 'passport'
import BodyParser from 'body-parser'
import csrf from 'csurf'
import cookieParser from 'cookie-parser'
import createHttpError from 'http-errors'
import path from 'path'
import pluralize from 'pluralize'
import RedisService from './services/redis.service'
import { RedisStore } from 'connect-redis'
import swaggerConfig from './config/swagger.config'
loadEnvironmentVariables()

const options = {
  secret: process.env.SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: RedisService.getClient() }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 1000 * 60 // 1 minute
  }
}
class App {
  private readonly App: Application = express()
  private readonly PORT: string | number = process.env.PORT || 5000
  private readonly HOST: string = process.env.HOST || 'localhost'
  constructor() {
    this.init()
  }
  private async init() {
    await RedisService.connect()
    this.initConfig()
    this.initMiddlewares()
    this.initPassport()
    this.initRoutes()
    this.initErrorHandling()
  }
  private initConfig() {
    new Database()
  }
  private initMiddlewares() {
    this.App.use(session(options))
    this.App.use(express.json())
    this.App.use(BodyParser.json())
    this.App.use(BodyParser.urlencoded({ extended: true }))
    this.App.use(cookieParser())
    this.App.use(csrf({ cookie: true }))
    this.App.use(passport.authenticate('session'))
    this.App.use(cors())
    morganConfig.init(this.App)
    helmetConfig.init(this.App)
    CorsConfig.init(this.App)
    dotenv.config()
    // view engine setup
    this.App.set('views', path.join(__dirname, '../dist/views'))
    this.App.set('view engine', 'ejs')

    // Serve static files from the public directory
    this.App.use(
      '/api/public',
      express.static(path.join(__dirname, '../dist/public'))
    )

    this.App.locals.pluralize = pluralize
    swaggerConfig.init(this.App)
  }
  private initRoutes() {
    this.App.use('/api/v1/', new GlobalRoutes().getRoutes())
  }
  private initErrorHandling() {
    // Middleware for handling messages
    this.App.use((req: any, res: Response, next: NextFunction) => {
      const msgs = req.session.messages || []
      res.locals.messages = msgs
      res.locals.hasMessages = !!msgs.length
      req.session.messages = []
      next()
    })

    // Middleware for setting CSRF token
    this.App.use((req: any, res: Response, next: NextFunction) => {
      res.locals.csrfToken = req.csrfToken()
      next()
    })

    // Middleware for handling 404 errors
    this.App.use((req: Request, res: Response, next: NextFunction) => {
      next(createHttpError(404))
    })

    // General error handling middleware
    this.App.use(
      (err: any, req: Request, res: Response, next: NextFunction) => {
        res.locals.message = err.message
        res.locals.error = req.app.get('env') === 'development' ? err : {}

        res.status(err.status || 500)
        res.status(404).json({
          message: err.message,
          error: err
        })
      }
    )
  }
  private initPassport() {
    this.App.use(passport.initialize())
    this.App.use(passport.session())
  }
  public listen() {
    this.App.listen(this.PORT, () => {
      console.log(`Server is running on http://${this.HOST}:${this.PORT}`)
    })
  }
}

export default App
