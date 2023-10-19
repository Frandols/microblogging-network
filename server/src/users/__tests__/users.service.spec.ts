import { NotFoundException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import PrismaService from '../../prisma/prisma.service'
import UsersService, { CreateUserPayload } from '../users.service'

describe('UsersService', () => {
  let usersService: UsersService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              upsert: jest.fn(),
            },
          },
        },
      ],
    }).compile()

    usersService = module.get<UsersService>(UsersService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  describe('findUnique', () => {
    it('should find a user', async () => {
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        avatar: 'avatar.jpg',
        authProvider: 'github',
        authProviderUserId: 'github123',
      }

      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(mockUser)

      const result = await usersService.findUnique(mockUser.id)

      expect(result).toEqual(mockUser)
      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        include: {
          posts: {
            include: { user: true, _count: { select: { children: true } } },
          },
        },
      })
    })

    it('should throw NotFoundException if user not found', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null)

      await expect(usersService.findUnique('1')).rejects.toThrow(
        NotFoundException,
      )
    })
  })

  describe('upsert', () => {
    it('should upsert a user', async () => {
      const mockPayload: CreateUserPayload<'github'> = {
        name: 'Test User',
        avatar: 'avatar.png',
        authProvider: 'github',
        authProviderUserId: 'github123',
      }

      const mockUser: User = { id: '1', ...mockPayload }

      jest.spyOn(prismaService.user, 'upsert').mockResolvedValue(mockUser)

      const result = await usersService.upsert(mockPayload)

      expect(result).toEqual(mockUser)
      expect(prismaService.user.upsert).toHaveBeenCalledWith({
        create: {
          name: mockPayload.name,
          avatar: mockPayload.avatar,
          authProvider: mockPayload.authProvider,
          authProviderUserId: mockPayload.authProviderUserId,
        },
        update: { name: mockPayload.name, avatar: mockPayload.avatar },
        where: {
          authProvider_authProviderUserId: {
            authProvider: mockPayload.authProvider,
            authProviderUserId: mockPayload.authProviderUserId,
          },
        },
      })
    })
  })
})
