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
    gitHubStrategy = new GitHubStrategy()
    usersService = module.get<UsersService>(UsersService)
    jwtService = module.get<JwtService>(JwtService)
  })

  describe('findUnique', () => {
    it('should find a token', async () => {
      const mockToken: string = 'mocked.token'

      jest
        .spyOn(tokensService, 'findUnique')
        .mockImplementation(async () => mockToken)

      const code = 'validCode'
      const provider = 'github'

      const result = await tokensService.findUnique(code, provider)

      expect(tokensService.findUnique).toHaveBeenCalledWith(code, provider)
      expect(result).toBe(mockToken)
    })
  })
})
