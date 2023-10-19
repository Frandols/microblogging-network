import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import PrismaModule from '../../prisma/prisma.module'
import UsersService from '../../users/users.service'
import TokensController from '../tokens.controller'
import TokensService from '../tokens.service'

describe('TokensController (e2e)', () => {
  let app: INestApplication
  let tokensService: TokensService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      controllers: [TokensController],
      providers: [TokensService, UsersService, JwtService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    tokensService = app.get<TokensService>(TokensService)
  })

  afterAll(async () => {
    await app.close()
  })

  it('should find a token', async () => {
    const mockToken: string = 'mocked.token'

    jest.spyOn(tokensService, 'findUnique').mockResolvedValue(mockToken)

    const validCode = 'validCode'
    const validProvider = 'github'

    await request(app.getHttpServer())
      .get('/tokens')
      .query({ code: validCode, provider: validProvider })
      .expect(200)
      .expect(mockToken)

    expect(tokensService.findUnique).toHaveBeenCalledWith(
      validCode,
      validProvider,
    )
  })
})
