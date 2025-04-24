import { RoleSchema, UserSchema } from '../routes/schemas/user.schema'

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  components: {
    schemas: {
      Role: RoleSchema,
      User: UserSchema,
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local development server',
    },
  ],
  paths: {
    '/users': {
      get: {
        summary: 'Get all users',
        responses: {
          200: {
            description: 'List of users',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/User',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Get user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'UUID of the user',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          200: {
            description: 'User data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          403: {
            description: 'Athentication failed.',
          },
          404: {
            description: 'User not found.',
          },
          406: {
            description: 'Content type or accept is wrong in the request head.',
          },
          500: {
            description: 'Internal server error.',
          },
        },
      },
    },
  },
}
