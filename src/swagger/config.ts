import { Type } from '@sinclair/typebox'
import {
  RolePayloadSchema,
  RoleSchema,
  UserPayloadSchema,
  UserSchema,
} from '../routes/schemas/user.schema'

export const swaggerSpec = {
  openapi: '3.0.0',
  info: {
    title: 'My API',
    version: '1.0.0',
  },
  tags: [
    {
      name: 'Users',
      description: 'Operations related to users',
    },
    {
      name: 'Roles',
      description: 'Operations related to roles',
    },
  ],
  components: {
    schemas: {
      Role: RoleSchema,
      User: UserSchema,
      UserPayload: UserPayloadSchema,
      UserUpdatePayload: Type.Partial(UserPayloadSchema),
      RolePayload: RolePayloadSchema,
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Local development server',
    },
    {
      url: 'http://http://express-api-alb-1-97419546.us-east-2.elb.amazonaws.com/api',
      description: 'AWS erver',
    },
  ],
  paths: {
    '/users': {
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserPayload',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
              },
            },
          },
          409: {
            description: 'User with the same email already exists',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Users'],
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
        tags: ['Users'],
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
          403: { description: 'Authentication failed.' },
          404: { description: 'User not found.' },
          406: { description: 'Invalid request headers.' },
          500: { description: 'Internal server error.' },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'Update user',
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
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UserPayload',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Updated user',
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
      delete: {
        tags: ['Users'],
        summary: 'Delete user by ID',
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
          204: {
            description: 'User deleted successfully',
            content: {},
          },
          403: { description: 'Authentication failed.' },
          404: { description: 'User not found.' },
          406: { description: 'Invalid request headers.' },
          500: { description: 'Internal server error.' },
        },
      },
    },
    '/roles': {
      post: {
        tags: ['Roles'],
        summary: 'Create a new role',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RolePayload',
              },
            },
          },
        },
        responses: {
          201: {
            description: 'Role created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Role',
                },
              },
            },
          },
          409: {
            description: 'Role with the same name already exists',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      get: {
        tags: ['Roles'],
        summary: 'Get all roles',
        responses: {
          200: {
            description: 'List of roles',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Role',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/roles/{id}': {
      get: {
        tags: ['Roles'],
        summary: 'Get role by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'UUID of the role',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          200: {
            description: 'Role data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Role',
                },
              },
            },
          },
          403: { description: 'Authentication failed.' },
          404: { description: 'Role not found.' },
          406: { description: 'Invalid request headers.' },
          500: { description: 'Internal server error.' },
        },
      },
      put: {
        tags: ['Roles'],
        summary: 'Update role',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'UUID of the role',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/RolePayload',
              },
            },
          },
        },
        responses: {
          200: {
            description: 'Role data',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Role',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Roles'],
        summary: 'Delete role by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            description: 'UUID of the role',
            schema: {
              type: 'string',
              format: 'uuid',
            },
          },
        ],
        responses: {
          204: {
            description: 'Role deleted successfully',
            content: {},
          },
          403: { description: 'Authentication failed.' },
          404: { description: 'Role not found.' },
          406: { description: 'Invalid request headers.' },
          500: { description: 'Internal server error.' },
        },
      },
    },
  },
}
