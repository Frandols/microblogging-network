import { NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import UsersService, { CreateUserPayload } from '../../users/users.service'
import GitHubStrategy from '../strategies/github.strategy'
import TokensService from '../tokens.service'

describe('TokensService', () => {
  let tokensService: TokensService
  let gitHubStrategy: GitHubStrategy
  let usersService: UsersService
  let jwtService: JwtService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokensService,
        {
          provide: GitHubStrategy,
          useValue: {
            findUser: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            upsert: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile()

    tokensService = module.get<TokensService>(TokensService)
    gitHubStrategy = module.get<GitHubStrategy>(GitHubStrategy)
    usersService = module.get<UsersService>(UsersService)
    jwtService = module.get<JwtService>(JwtService)
  })

  describe('findUnique', () => {
    it('should find a token', async () => {
      const mockPayload: CreateUserPayload = {
        name: 'Test User',
        avatar: 'avatar.png',
        authProvider: 'github',
        authProviderUserId: 'github123',
      }

      jest.spyOn(gitHubStrategy, 'findUser').mockResolvedValue(mockPayload)

      const mockUser: User = { id: '1', ...mockPayload }

      jest.spyOn(usersService, 'upsert').mockResolvedValue(mockUser)

      const mockToken: string = 'mocked.token'

      jest.spyOn(jwtService, 'signAsync').mockResolvedValue(mockToken)

      const result = await tokensService.findUnique('validCode', 'github')

      expect(result).toBe(mockToken)
    })

    it('should throw NotFoundException if provider not found', async () => {
      await expect(
        tokensService.findUnique('validCode', 'invalidProvider'),
      ).rejects.toThrow(NotFoundException)
    })
  })
})
