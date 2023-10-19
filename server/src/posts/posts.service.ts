import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Post, User } from '@prisma/client'
import PrismaService from '../prisma/prisma.service'

export type CreatePostPayload = Pick<Post, 'content' | 'userId' | 'parentId'>

export type UpdatePostPayload = Pick<Post, 'content'>

@Injectable()
export default class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Create a post.
   *
   * @param payload - The payload to create the post.
   *
   * @throws Parent not found.
   *
   * @returns A promise with a post object.
   */
  async create(
    payload: CreatePostPayload,
  ): Promise<Post & { parent: Post; user: User }> {
    if (payload.parentId === null)
      return (await this.prisma.post.create({
        data: payload,
        include: {
          parent: true,
          user: true,
        },
      })) as Post & { parent: Post; user: User }

    const parent = await this.prisma.post.findUnique({
      where: { id: payload.parentId },
    })

    if (parent === null) throw new NotFoundException('Parent not found')

    return (await this.prisma.post.create({
      data: payload,
      include: {
        parent: true,
        user: true,
      },
    })) as Post & { parent: Post; user: User }
  }

  /**
   * Find all posts.
   *
   * @returns A promise with a posts array.
   */
  async findMany(): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { parentId: null },
      include: {
        user: true,
        _count: {
          select: { children: true },
        },
      },
    })
  }

  /**
   * Find a post.
   *
   * @param id - The id for finding the post.
   *
   * @throws Post not found.
   *
   * @returns A promise with a post object.
   */
  async findUnique(id: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        children: {
          include: { user: true, _count: { select: { children: true } } },
        },
      },
    })

    if (!post) throw new NotFoundException('Post not found')

    return post
  }

  /**
   * Update a post.
   *
   * @param id - The id for finding the post to update.
   *
   * @param userId - An user id to check if the update action is authorized.
   *
   * @param payload - The payload to update the post.
   *
   * @throws Post not found.
   *
   * @throws User unauthorized.
   *
   * @returns A promise with a post object.
   */
  async update(
    id: string,
    userId: string,
    payload: UpdatePostPayload,
  ): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } })

    if (!post) throw new NotFoundException('Post not found')

    if (post.userId !== userId)
      throw new UnauthorizedException('User unauthorized')

    return await this.prisma.post.update({
      where: { id: post.id },
      data: { content: payload.content },
    })
  }

  /**
   * Delete a post.
   *
   * @param id - The id for finding the post to delete.
   *
   * @param userId - An user id to check if the delete action is authorized.
   *
   * @throws Post not found.
   *
   * @throws User unauthorized.
   *
   * @returns A promise with a post object.
   */
  async delete(id: string, userId: string): Promise<Post> {
    const post = await this.prisma.post.findUnique({ where: { id } })

    if (!post) throw new NotFoundException('Post not found')

    if (post.userId !== userId)
      throw new UnauthorizedException('User unauthorized')

    return await this.prisma.post.delete({ where: { id: post.id } })
  }
}
