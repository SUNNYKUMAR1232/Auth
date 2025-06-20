import { createLogger, format, transports, Logger } from 'winston'
import winston from 'winston/lib/winston/config'
import { Application, Request, Response, NextFunction } from 'express'

class LoggerConfig {
  private logger: Logger

  constructor() {
    winston.addColors({
      info: 'green',
      warn: 'yellow',
      error: 'red',
      debug: 'blue'
    })

    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console()]
    })
  }

  public init(app: Application): void {
    app.use((req: Request, _res: Response, next: NextFunction) => {
      this.logger.info(`${req.method} ${req.url}`)
      next()
    })
  }

  public getLogger(): Logger {
    return this.logger
  }
}

export default new LoggerConfig()
