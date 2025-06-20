import passport from 'passport'
import {
  SocalProviders,
  TSocialProvider,
} from '../interfaces/auth.interface'
import { saveUser } from '@src/utils/save.user'

  
 export function configureStrategy(
    provider: SocalProviders,
    Strategy,
    providerConfig: TSocialProvider,
    passReqToCallback: boolean = false
  ) {
    passport.use(
      new Strategy(
        {
          clientID: providerConfig.clientID,
          clientSecret: providerConfig.clientSecret,
          consumerKey: providerConfig.consumerKey,
          consumerSecret: providerConfig.consumerSecret,
          callbackURL: providerConfig.callbackURL,
          passReqToCallback
        },
        async (req, accessToken, refreshToken, profile, done) => {
          return  saveUser(
            provider,
            accessToken,
            refreshToken,
            profile,
            done
          )
        }
      )
    )
  }
 
 export function getLogin(name: string, scope: string[]) {
    return passport.authenticate(name, { scope })
  }
 export function getCallback(
    name: string,
    failureRedirect?: string,
    successRedirect?: string
  ) {
    return passport.authenticate(name, { failureRedirect, successRedirect })
  }



