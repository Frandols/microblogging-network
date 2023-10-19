import { Injectable, UnauthorizedException } from '@nestjs/common'
import axios from 'axios'
import config from '../../../config'
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

@Injectable()
export default class GoogleStrategy implements Strategy<'google'> {
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
            client_id: config.googleClientID,
            client_secret: config.googleClientSecret,
            code,
            redirect_uri: `${
              process.env.NODE_ENV === 'production' ? 'https:' : 'http:'
            }//${process.env.HOST || 'localhost'}${
              process.env.NODE_ENV === 'production' ? '' : ':5173'
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
