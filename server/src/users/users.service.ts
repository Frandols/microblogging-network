import { Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@prisma/client'
import PrismaService from '../prisma/prisma.service'
import { StrategyName } from '../tokens/tokens.service'

export interface CreateUserPayload<T extends string> {
  name: string
  avatar: string
  authProvider: T
  authProviderUserId: string
}

@Injectable()
export default class UsersService {
  /**
   * Create an users service.
   *
   * @param prisma - The prisma service instance.
   */
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find an user.
   *
   * @param id - The id for finding the user.
   *
   * @throws User not found.
   *
   * @returns A promise with an user object.
   */
  async findUnique(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          include: { user: true, _count: { select: { children: true } } },
        },
      },
    })

    if (!user) throw new NotFoundException()

    return user
  }

  /**
   * Upsert an user.
   *
   * @param payload - The payload for upserting the user.
   *
   * @returns A promise with an user object.
   */
  async upsert(payload: CreateUserPayload<StrategyName>): Promise<User> {
    return await this.prisma.user.upsert({
      create: {
        name: payload.name,
        avatar: payload.avatar,
        authProvider: payload.authProvider,
        authProviderUserId: payload.authProviderUserId,
      },
      update: { name: payload.name, avatar: payload.avatar },
      where: {
        authProvider_authProviderUserId: {
          authProvider: payload.authProvider,
          authProviderUserId: payload.authProviderUserId,
        },
      },
    })
  }
}
