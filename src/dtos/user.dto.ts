import Joi from 'joi'
import { JoiSchemaManager } from './schema.manager' // Import JoiSchemaManager

interface UserDtoParams {
  username?: string
  password?: string
  name: string
  email: string
  githubId?: string
  googleId?: string
  image?: string
  location?: string
  birthdate?: Date
  createdAt?: Date
  updatedAt?: Date
}

class UserDto {
  private username: string
  private password: string
  private name: string
  private email: string
  private githubId?: string
  private googleId?: string
  private image?: string
  private location?: string
  private birthdate?: Date
  private createdAt?: Date
  private updatedAt?: Date

  private static schemaManager = new JoiSchemaManager(
    Joi.object({
      username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional()
        .description('Username'),
      password: Joi.string().min(8).optional().description('User password'),
      name: Joi.string().required().description('User name'),
      email: Joi.string().email().required().description('User email'),
      githubId: Joi.string().optional().description('GitHub ID'),
      googleId: Joi.string().optional().description('Google ID'),
      image: Joi.string().optional().description('User image URL'),
      location: Joi.string().optional().description('User location'),
      birthdate: Joi.date().optional().description('User birthdate'),
      createdAt: Joi.date().default(Date.now).description('Creation date'),
      updatedAt: Joi.date().default(Date.now).description('Last update date')
    })
  )

  constructor(params: UserDtoParams) {
    this.username = params.username
    this.password = params.password
    this.name = params.name
    this.email = params.email
    this.githubId = params.githubId
    this.googleId = params.googleId
    this.image = params.image
    this.location = params.location
    this.birthdate = params.birthdate
    this.createdAt = params.createdAt
    this.updatedAt = params.updatedAt
  }

  public static getValidationSchema() {
    return this.schemaManager.getValidationSchema()
  }

  public static validate(data: Partial<UserDto>) {
    return this.schemaManager.validate(data)
  }
  public static getSwaggerSchema() {
    return this.schemaManager.getSwaggerSchema()
  }
}

export { UserDtoParams, UserDto }
