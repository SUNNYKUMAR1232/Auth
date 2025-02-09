import { Request, Response, NextFunction } from 'express' // Added import
import { google } from 'googleapis'
import { UserDtoParams } from '../dtos/user.dto'
import redisService from '../services/redis.service'
import loadEnvironmentVariables from '../config/env.config'

loadEnvironmentVariables()
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } =
  process.env

// tslint:disable-next-line: no-empty
class GithubAuth {
  constructor() {}
  public async Logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const sessionId = req.sessionID
    const googleOAuth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID.toString(),
      GOOGLE_CLIENT_SECRET.toString(),
      GOOGLE_CALLBACK_URL.toString()
    )

    req.logout(async (err) => {
      if (err) {
        return next(err)
      }

      try {
        // Revoke Google token
        const user = req.user as UserDtoParams
        if (user && user.googleId) {
          await googleOAuth2Client.revokeToken(user.googleId)
        }

        // Destroy session in Redis
        if (!sessionId) {
          return res.status(400).json({ message: 'No session found' })
        }
        await redisService.getClient().del(`sess:${sessionId}`)

        req.session.destroy(() => {
          res.clearCookie('connect.sid')
          res.status(200).json({ message: 'Logged out' })
        })
      } catch (error) {
        return next(error)
      }
    })
  }
}
export default GithubAuth
