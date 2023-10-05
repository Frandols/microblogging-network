import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import UsersService from '../users/users.service'
import GitHubStrategy from './strategies/github.strategy'

@Injectable()
export default class TokensService {
  /**
   * Create a tokens service.
   *
   * @param {GitHubStrategy} gitHubStrategy - The GitHub strategy instance.
   *
   * @param {UsersService} usersService - The users service instance.
   *
   * @param {JwtService} jwtService - The JWT service instance.
   */
  constructor(
    private readonly gitHubStrategy: GitHubStrategy,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Find a token.
   * @param {string} code - The provided code for finding the token.
   *
   * @param {string} provider - The provider name for selecting a strategy.
   *
   * @throws {NotFoundException} Provider not found.
   *
   * @returns {Promise<string>} A promise with a token string.
   */
  async findUnique(code: string, provider: string) {
    let payload: {
      name: string
      avatar: string
      authProvider: string
      authProviderUserId: string
    }

    switch (provider) {
      case 'github':
        payload = await this.gitHubStrategy.findUser(code)
        break
      default:
        throw new NotFoundException('Provider not found')
    }

    const user = await this.usersService.upsert(payload)

    return this.jwtService.signAsync({ id: user.id })
  }
}
