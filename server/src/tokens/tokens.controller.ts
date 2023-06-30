import { Controller, Get, Param } from '@nestjs/common'
import TokensService from './tokens.service'
import UsersService from 'src/users/users.service'

@Controller('tokens')
export default class TokensController {
  constructor(
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
  ) {}

  @Get(':code')
  async getToken(@Param('code') code: string) {
    const token = await this.tokensService.getToken(code)

    this.usersService.upsert(token)

    return token
  }
}
