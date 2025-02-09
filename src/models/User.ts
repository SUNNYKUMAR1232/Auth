import mongoose, { Schema, Model } from 'mongoose'
import IUser from '../interfaces/user.interfaces/user.interface'
class User {
  private userModel: Model<IUser>
  constructor() {
    const userSchema = new Schema(
      {
        username: { type: String, required: false },
        password: { type: String, required: false },
        name: { type: String, required: true },
        email: { type: String, unique: true, sparse: true },
        githubId: { type: String, sparse: true },
        googleId: { type: String, sparse: true },
        image: { type: String, sparse: true }
      },
      { timestamps: true }
    )

    this.userModel = mongoose.model<IUser>('User', userSchema)
  }

  public getModel(): Model<IUser> {
    return this.userModel
  }
}

const userInstance = new User()
export default userInstance.getModel()
export { userInstance as User }
