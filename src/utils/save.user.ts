import { UserDto, UserDtoParams } from "@src/dtos/user.dto"
import { SocalProviders } from "@src/interfaces/auth.interface"
import User from "@src/models/User"

  export async function saveUser(
    provider: SocalProviders,
    accessToken: string,
    refreshToken: string,
    profile,
    done
  ) {
    try {
      const user = await User.findOne({ email: profile.emails[0].value })
      console.log({
        accessToken,
        refreshToken,
      })
      if (user) {
        return done(null, user)
      } else {
        const userData: UserDtoParams = {
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username || profile.displayName,
          image:  profile.photos[0].value ,
        }
        const userDto = new UserDto(userData)
  
        // Validate user data
        const validationResult = UserDto.validate(userDto)
        if (validationResult.error) {
          return done(validationResult.error)
        }
        const newUser = new User(userDto)
        await newUser.save()
        return done(null, newUser)
      }
    } catch (error) {
      return done(error)
    }
  }