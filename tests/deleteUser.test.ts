import { deleteUser } from '../src/controllers/userController'
import { PrismaClient } from '../src/generated/prisma'
import httpMocks from 'node-mocks-http'

jest.mock('../src/generated/prisma', () => {
  const mPrisma = {
    user: {
      delete: jest.fn(),
    },
  }
  return { PrismaClient: jest.fn(() => mPrisma), default: mPrisma }
})

const prisma = new PrismaClient()

describe('deleteUser', () => {
  it('should delete user and return 200', async () => {
    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: { userId: '123' },
    })
    const res = httpMocks.createResponse()

    await deleteUser(req, res)

    expect(prisma.user.delete).toHaveBeenCalledWith({ where: { id: '123' } })
    expect(res.statusCode).toBe(204)
    expect(res._isEndCalled()).toBe(true)
    expect(res._getData()).toBe('')
  })

  it('should return 500 on error', async () => {
    const req = httpMocks.createRequest({
      method: 'DELETE',
      params: { id: '123' },
    })
    const res = httpMocks.createResponse()

    prisma.user.delete = jest.fn().mockRejectedValue(new Error('DB Error'))

    await deleteUser(req, res)

    expect(res.statusCode).toBe(500)
    expect(res._getJSONData()).toEqual({ error: 'Failed to delete user' })
  })
})
