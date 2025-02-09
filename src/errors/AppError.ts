import { IAppError } from '../interfaces/error.interfaces/request.error.interface'

class AppError extends Error implements IAppError {
  statusCode: number

  constructor(
    message: string,
    statusCode: number,
    public data?: Record<string, unknown>
  ) {
    super(message)
    this.statusCode = statusCode
    this.data = data
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
