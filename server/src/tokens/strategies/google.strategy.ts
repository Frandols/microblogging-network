import { UnauthorizedException } from '@nestjs/common'
import axios from 'axios'
import { CreateUserPayload } from '../../users/users.service'
import Strategy from '../interfaces/strategy.interface'

interface GoogleAPITokenResponse {
  access_token: string
}

interface GoogleAPIUserResponse {
  names: {
    metadata: {
      source: {
        id: string
      }
    }
    displayName: string
  }[]
  photos: {
    url: string
  }[]
}

export default class GoogleStrategy implements Strategy<'google'> {
  private client_id: string
  private client_secret: string

  /**
   * Create a GitHub authentication strategy.
   *
   * @param client_id - The GitHub OAuth service client ID.
   *
   * @param client_secret - The GitHub OAuth service client secret.
   */
  constructor(client_id: string, client_secret: string) {
    this.setClientID(client_id)
    this.setClientSecret(client_secret)
  }

  /**
   * Set GitHub OAuth service client ID.
   *
   * @param client_id - The GitHub OAuth service client ID.
   */
  private setClientID(client_id: string) {
    this.client_id = client_id
  }

  /**
   * Get GitHub OAuth service client ID.
   *
   * @returns The GitHub OAuth service client ID.
   */
  getClientID() {
    return this.client_id
  }

  /**
   * Set GitHub OAuth service client secret.
   *
   * @param client_secret - The GitHub OAuth service client secret.
   */
  private setClientSecret(client_secret: string) {
    this.client_secret = client_secret
  }

  /**
   * Get GitHub OAuth service client secret.
   *
   * @returns The GitHub OAuth service client secret.
   */
  getClientSecret() {
    return this.client_secret
  }

  /**
   * Find a Google's user token.
   *
   * @param code - The provided code for finding the token.
   *
   * @throws Invalid code.
   *
   * @returns A promise with a token string.
   */
  private async findToken(code: string) {
    try {
      const response = await axios.post<GoogleAPITokenResponse>(
        'https://oauth2.googleapis.com/token',
        {},
        {
          params: {
            client_id: this.getClientID(),
            client_secret: this.getClientSecret(),
            code,
            redirect_uri: `${
              process.env.NODE_ENV === 'production'
                ? `https://${process.env.HOST}`
                : 'http://localhost:5173'
            }?provider=google`,
            grant_type: 'authorization_code',
          },
          headers: { Accept: 'application/json' },
        },
      )

      return response.data.access_token
    } catch {
      throw new UnauthorizedException('Invalid code')
    }
  }

  /**
   * Find a Google's user.
   *
   * @param code - The provided code for finding the token.
   *
   * @throws Invalid token.
   *
   * @returns A promise with a payload for creating an user.
   */
  async findUser(code: string): Promise<CreateUserPayload<'google'>> {
    const token = await this.findToken(code)

    try {
      const response = await axios.get<GoogleAPIUserResponse>(
        'https://people.googleapis.com/v1/people/me?personFields=names,photos',
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      )

      return {
        name: response.data.names[0].displayName,
        avatar: response.data.photos[0].url,
        authProvider: 'google',
        authProviderUserId: response.data.names[0].metadata.source.id,
      }
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
