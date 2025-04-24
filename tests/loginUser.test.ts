import { loginUser } from '../src/controllers/userController'
import httpMocks from 'node-mocks-http'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '../src/generated/prisma'

jest.mock('bcrypt')
jest.mock('jsonwebtoken')
jest.mock('../src/generated/prisma', () => {
  const mPrisma = {
    user: {
      findUnique: jest.fn(),
    },
  }
  return { PrismaClient: jest.fn(() => mPrisma) }
})

const prisma = new PrismaClient() as unknown as {
  user: {
    findUnique: jest.Mock
  }
}

describe('loginUser controller', () => {
  const mockNext = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should login a user with correct credentials', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: { email: 'test@example.com', password: 'password123' },
    })
    const res = httpMocks.createResponse()

    const mockUser = {
      id: 'user-id',
      email: 'test@example.com',
      name: 'Test User',
      age: 25,
      hashed_password: 'hashedpass',
      userRoles: [
        {
          role: { id: 'role-id', name: 'admin' },
        },
      ],
    }

    prisma.user.findUnique.mockResolvedValueOnce(mockUser)
    ;(bcrypt.compare as jest.Mock).mockResolvedValueOnce(true) // ; protects from accidental concatenation if no semicolon is before it
    ;(jwt.sign as jest.Mock).mockReturnValue('fake-jwt') // ; protects from accidental concatenation if no semicolon is before it

    await loginUser(req, res, mockNext)

    const data = res._getJSONData()
    expect(res.statusCode).toBe(200)
    expect(data.token).toBe('fake-jwt')
    expect(data.message).toBe('Login successful')
  })

  it('should return 404 for invalid email', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: { email: 'wrong@example.com', password: 'password123' },
    })
    const res = httpMocks.createResponse()

    prisma.user.findUnique.mockResolvedValueOnce(null)

    await loginUser(req, res, mockNext)

    expect(res.statusCode).toBe(404)
    expect(res._getJSONData().message).toBe(
      'User with this email does not exist',
    )
  })

  it('should return 401 for wrong password', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: { email: 'test@example.com', password: 'wrongpass' },
    })
    const res = httpMocks.createResponse()

    prisma.user.findUnique.mockResolvedValueOnce({
      id: 'user-id',
      email: 'test@example.com',
      name: 'Test User',
      age: 25,
      hashed_password: 'hashedpass',
      userRoles: [],
    })
    ;(bcrypt.compare as jest.Mock).mockResolvedValueOnce(false)

    await loginUser(req, res, mockNext)

    expect(res.statusCode).toBe(401)
    expect(res._getJSONData().message).toBe('Invalid credentials')
  })

  it('should call next on Prisma error', async () => {
    const req = httpMocks.createRequest({
      method: 'POST',
      body: { email: 'test@example.com', password: 'password123' },
    })
    const res = httpMocks.createResponse()

    const error = new Error('Prisma connection failed')
    prisma.user.findUnique.mockRejectedValueOnce(error)

    await loginUser(req, res, mockNext)

    expect(mockNext).toHaveBeenCalledWith(error)
  })
})
