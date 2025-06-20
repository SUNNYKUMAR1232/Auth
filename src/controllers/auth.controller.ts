import { Request, Response,NextFunction } from 'express'
import loadEnvironmentVariables from '../config/env.config'

loadEnvironmentVariables()


export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
      req.logout((err) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to log out' })
        }
        res.redirect('/api/v1/auth/login')
      })
    }
    catch (error) {
      res.status(500).json({ error: 'Failed to log out', errorMessage: error.message })
    }
}

export const isLoggedIn = (req: Request, res: Response, next: NextFunction): void => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

export default {
    logout,
    isLoggedIn
}