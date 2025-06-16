import { Type } from '@sinclair/typebox'

export const RoleSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
})

export const LoginPayloadSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
})

export const TokenSchema = Type.Object({
  token: Type.String(),
})

export const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  age: Type.Number(),
  userRoles: Type.Array(RoleSchema),
})

export const UserPayloadSchema = Type.Intersect([
  Type.Omit(UserSchema, ['id', 'userRoles']),
  Type.Object({
    password: Type.String(),
  }),
])

export const RolePayloadSchema = Type.Omit(RoleSchema, ['id'])
