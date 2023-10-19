import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import UsersService from '../users/users.service'
import Strategy from './interfaces/strategy.interface'
import GitHubStrategy from './strategies/github.strategy'
import GoogleStrategy from './strategies/google.strategy'

const strategiesNames = ['github', 'google'] as const

export type StrategyName = (typeof strategiesNames)[number]

type StrategyRecord = {
  [K in StrategyName]: Strategy<K>
}

const strategyRecord: StrategyRecord = {
  github: new GitHubStrategy(),
  google: new GoogleStrategy(),
}

@Injectable()
export default class TokensService {
  /**
   * Create a tokens service.
   *
   * @param gitHubStrategy - The GitHub strategy instance.
   *
   * @param googleStrategy - The Google strategy instance.
   *
   * @param usersService - The users service instance.
   *
   * @param jwtService - The JWT service instance.
   */
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Find a token.
   *
   * @param code - The provided code for finding the token.
   *
   * @param provider - The provider name for selecting a strategy.
   *
   * @throws Provider not found.
   *
   * @returns A promise with a token string.
   */
  async findUnique(code: string, provider: StrategyName) {
    const strategy = strategyRecord[provider]

    const payload = await strategy.findUser(code)

    const user = await this.usersService.upsert(payload)

    return this.jwtService.signAsync({ id: user.id })
  }
}
