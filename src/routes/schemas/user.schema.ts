import { Type } from '@sinclair/typebox'

export const RoleSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
})

export const UserSchema = Type.Object({
  id: Type.String(),
  name: Type.String(),
  email: Type.String(),
  age: Type.Number(),
  userRoles: Type.Array(RoleSchema),
})
