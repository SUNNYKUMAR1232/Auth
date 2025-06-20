import Joi from 'joi'
import { JoiSchemaManager } from './schema.manager' // Import JoiSchemaManager

interface UserDtoParams {
  username?: string
  password?: string
  name: string
  email: string
  image?: string
  createdAt?: Date
  updatedAt?: Date
}

class UserDto {
  private username: string
  private password: string
  private name: string
  private email: string
  private image?: string
  private createdAt?: Date
  private updatedAt?: Date

  private static schemaManager = new JoiSchemaManager(
    Joi.object({
      username: Joi.string(),
      password: Joi.string().min(8).optional().description('User password'),
      name: Joi.string().required().description('User name'),
      email: Joi.string().email().required().description('User email'),
      image: Joi.string().optional().description('User image URL'),
      createdAt: Joi.date().default(Date.now).description('Creation date'),
      updatedAt: Joi.date().default(Date.now).description('Last update date')
    })
  )

  constructor(params: UserDtoParams) {
    this.username = params.username
    this.password = params.password
    this.name = params.name
    this.email = params.email
    this.image = params.image
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
