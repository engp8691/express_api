export type Role = {
    id: string
    name: string
}

export type User = {
    id: string
    name: string
    email: string
    age: number
    userRoles: Role[]
}

export type LoginPayload = {
    email: string
    password: string
}
