import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import PrismaModule from '../../prisma/prisma.module'
import UsersResolver from '../users.resolver'
import UsersService from '../users.service'

describe('UsersResolver', () => {
  let usersResolver: UsersResolver
  let usersService: UsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            findUnique: jest.fn(),
          },
        },
        JwtService,
      ],
    }).compile()

    usersResolver = module.get<UsersResolver>(UsersResolver)
    usersService = module.get<UsersService>(UsersService)
  })

  describe('user', () => {
    it('should return a user when given a valid ID', async () => {
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        avatar: 'avatar.png',
        authProvider: 'someProvider',
        authProviderUserId: '123',
      }

      jest.spyOn(usersService, 'findUnique').mockResolvedValue(mockUser)

      const result = await usersResolver.user('1')

      expect(result).toEqual(mockUser)
      expect(usersService.findUnique).toHaveBeenCalledWith(mockUser.id)
    })
  })

  describe('me', () => {
    it('should return the authenticated user', async () => {
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        avatar: 'avatar.png',
        authProvider: 'someProvider',
        authProviderUserId: '123',
      }

      const mockContext = {
        user: {
          id: '1',
        },
      }

      jest.spyOn(usersService, 'findUnique').mockResolvedValue(mockUser)

      const result = await usersResolver.me(mockContext)

      expect(result).toEqual(mockUser)
      expect(usersService.findUnique).toHaveBeenCalledWith(mockContext.user.id)
    })
  })
})
