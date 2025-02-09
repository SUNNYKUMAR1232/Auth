import { Application } from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import { UserDto } from '../dtos/user.dto'
import authSwagger from '../utils/auth.swagger.path'

class SwaggerConfig {
  private swaggerOptions: swaggerJsdoc.Options

  constructor() {
    this.swaggerOptions = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'OAuth 2.0',
          version: '1.0.0',
          description: 'OAuth 2.0 API with Passport'
        },
        servers: [
          {
            url: `http://localhost:${process.env.PORT || 5000}`
          }
        ],
        components: {
          securitySchemes: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            }
          },
          schemas: {
            User: UserDto.getSwaggerSchema()
          }
        },
        security: [
          {
            bearerAuth: []
          }
        ],
        tags: [
          {
            name: 'Auth',
            description: 'Authentication related endpoints'
          },
          {
            name: 'User',
            description: 'User related endpoints'
          }
        ],
        paths: {
          ...authSwagger
        },
        definitions: {},
        responses: {},
        parameters: {},
        requestBodies: {},
        headers: {},
        examples: {},
        links: {},
        callbacks: {}
      },
      apis: ['./src/routes/*.ts']
    }
  }

  public init(app: Application): void {
    const swaggerDocs = swaggerJsdoc(this.swaggerOptions)
    app.use('/api/v1/test', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  }
}

export default new SwaggerConfig()
