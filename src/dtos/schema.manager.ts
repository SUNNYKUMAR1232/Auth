import Joi from 'joi'
import convert from 'joi-to-swagger'

export class JoiSchemaManager {
  private schema: Joi.ObjectSchema

  constructor(initialSchema: Joi.ObjectSchema) {
    this.schema = initialSchema
  }

  public getValidationSchema() {
    return this.schema
  }

  public validate(data: any) {
    return this.schema.validate(data)
  }
  public getSwaggerSchema() {
    const { swagger } = convert(this.schema)
    return swagger
  }
}
