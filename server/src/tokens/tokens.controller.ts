import { Controller, Get, Query } from '@nestjs/common'
import TokensService from './tokens.service'

@Controller('tokens')
export default class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get()
  async findUnique(
    @Query('code') code: string,
    @Query('provider') provider: string,
  ) {
    return await this.tokensService.findUnique(code, provider)
  }
}
