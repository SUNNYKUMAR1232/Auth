/**
 * @author Sunny Kumar
 * @date 2023-10-01
 * @file CORS configuration for Express application
 * @module config/cors.config
 * @description This module sets up CORS middleware for the Express application.
 * @see {@link https://expressjs.com/en/resources/middleware/cors.html | CORS Middleware Documentation}
 **/

import cors, { CorsOptions } from 'cors'
import { Application } from 'express'

class CorsConfig {
  private options: CorsOptions

  constructor() {
    this.options = {
      origin: process.env.CORS_ORIGIN || '*', // Allow all origins by default
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
      allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
      credentials: true // Allow credentials
    }
  }

  public init(app: Application): void {
    app.use(cors(this.options))
  }
}

export default new CorsConfig()
