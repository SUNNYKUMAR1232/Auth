import { createLogger, format, transports } from 'winston'
import { Logtail } from '@logtail/node'
import { LogtailTransport } from '@logtail/winston'
import { Application, Request, Response, NextFunction } from 'express'

class LoggerConfig {
  private logger: any

  constructor() {
    const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN || '')

    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console(), new LogtailTransport(logtail)]
    })
  }

  public init(app: Application): void {
    app.use((req: Request, res: Response, next: NextFunction) => {
      this.logger.info(`${req.method} ${req.url}`)
      next()
    })
  }

  public getLogger() {
    return this.logger
  }
}

export default new LoggerConfig()
