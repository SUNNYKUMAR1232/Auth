const authSwagger = {
  '/api/v1/auth/github': {
    get: {
      tags: ['Auth'],
      summary: 'GitHub Authentication',
      description: 'Redirects to GitHub for authentication',
      responses: {
        302: {
          description: 'Redirect to GitHub'
        }
      }
    }
  },
  '/api/v1/auth/github/callback': {
    get: {
      tags: ['Auth'],
      summary: 'GitHub Authentication Callback',
      description: 'Handles GitHub authentication callback',
      responses: {
        302: {
          description: 'Redirect to /api/v1/auth'
        }
      }
    }
  },
  '/api/v1/auth/google': {
    get: {
      tags: ['Auth'],
      summary: 'Google Authentication',
      description: 'Redirects to Google for authentication',
      responses: {
        302: {
          description: 'Redirect to Google'
        }
      }
    }
  },
  '/api/v1/auth/google/callback': {
    get: {
      tags: ['Auth'],
      summary: 'Google Authentication Callback',
      description: 'Handles Google authentication callback',
      responses: {
        302: {
          description: 'Redirect to /api/v1/auth'
        }
      }
    }
  },
  '/api/v1/auth/me': {
    get: {
      tags: ['Auth'],
      summary: 'Get User Info',
      description: "Retrieves the authenticated user's information",
      responses: {
        200: {
          description: 'Successful response',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/User'
              }
            }
          }
        }
      }
    }
  },
  '/api/v1/auth/logout': {
    get: {
      tags: ['Auth'],
      summary: 'Logout',
      description: 'Logs out the authenticated user',
      responses: {
        200: {
          description: 'Successful response'
        }
      }
    }
  }
}

export default authSwagger
