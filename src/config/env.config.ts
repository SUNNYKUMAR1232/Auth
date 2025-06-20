/**
 * @author Sunny Kumar
 * @date 2023-10-01
 * @file Environment variable loader for Express application
 * @module config/env.config
 * @description This module loads environment variables based on the NODE_ENV value.
**/
import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'
dotenv.config() // Load default .env file
function loadEnvironmentVariables() {
  const env = process.env.NODE_ENV || 'development' // Default to 'development' if NODE_ENV is not set
  const envPath = env === "production"
    ? path.join(__dirname, `../../.env.${env}`)
    : path.join(__dirname, `../../.env.${env}`);

  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath })
    console.log(`Environment: ${env}`)
    console.log(`Loading environment variables from: ${envPath}`)
  } else {
    console.error(`Environment file not found: ${envPath}`)
    process.exit(1) // Exit the process with an error code
  }
}

export default loadEnvironmentVariables
