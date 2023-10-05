import { Test, TestingModule } from '@nestjs/testing'
import TokensController from '../tokens.controller'
import TokensService from '../tokens.service'

describe('TokensController', () => {
  let tokensController: TokensController
  let tokensService: TokensService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TokensController],
      providers: [
        {
          provide: TokensService,
          useValue: {
            findUnique: jest.fn(),
          },
        },
      ],
    }).compile()

    tokensController = module.get<TokensController>(TokensController)
    tokensService = module.get<TokensService>(TokensService)
  })

  describe('findOne', () => {
    it('should find a token', async () => {
      const mockToken: string = 'mocked.token'

      jest.spyOn(tokensService, 'findUnique').mockResolvedValue(mockToken)

      const validCode: string = 'validCode'
      const validProvider: string = 'github'

      const result = await tokensController.findUnique(validCode, validProvider)

      expect(result).toEqual(mockToken)
      expect(tokensService.findUnique).toHaveBeenCalledWith(
        validCode,
        validProvider,
      )
    })
  })
})
