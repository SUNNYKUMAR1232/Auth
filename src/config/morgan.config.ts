import morgan from 'morgan'
import { Application } from 'express'
import chalk from 'chalk'

class MorganConfig {
  private format: any

  constructor() {
    // Define custom token for Morgan
    this.format = morgan(function (tokens, req, res) {
      const method = chalk.blue(tokens.method(req, res))
      const url = chalk.green(tokens.url(req, res))
      const status =
        parseInt(tokens.status(req, res), 10) < 400
          ? chalk.green(tokens.status(req, res).toString())
          : chalk.red(tokens.status(req, res).toString())
      const contentLength = chalk.yellow(tokens.res(req, res, 'content-length'))
      const date = chalk.cyan(
        new Date()
          .toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
          .toUpperCase()
      )
      const responseTime = chalk.bgCyan(
        tokens['response-time'](req, res).toString() + ' ms'
      )

      return [method, url, status, contentLength, date, responseTime].join(' ')
    })
  }

  public init(app: Application): void {
    // Initialize Morgan middleware with custom format
    app.use(this.format)
  }
}

export default new MorganConfig()
