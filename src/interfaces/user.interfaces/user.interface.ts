import { Document } from 'mongoose'
interface IUser extends Document {
  name: string
  email: string
  githubId?: string
  googleId?: string
  image?: string
}
export default IUser
