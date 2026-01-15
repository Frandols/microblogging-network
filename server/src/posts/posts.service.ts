import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Like, Post, User } from '@prisma/client'
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
  async findMany(userId?: string): Promise<any[]> {
    const posts = await this.prisma.post.findMany({
      where: { parentId: null },
      include: {
        user: true,
        likes: userId ? { where: { userId } } : false,
        _count: {
          select: { children: true, likes: true },
        },
      },
    })

    return posts.map(({ likes, ...post }) => ({
      ...post,
      likedByMe: likes?.length > 0,
    }))
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
  async findUnique(id: string, userId?: string): Promise<any> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        parent: true,
        likes: userId ? { where: { userId } } : false,
        children: {
          include: {
            user: true,
            likes: userId ? { where: { userId } } : false,
            _count: { select: { children: true, likes: true } },
          },
        },
        _count: { select: { children: true, likes: true } },
      },
    })

    if (!post) throw new NotFoundException('Post not found')

    const parents = []
    let parentId = post.parentId

    while (parentId) {
      const parent = await this.prisma.post.findUnique({
        where: { id: parentId },
        include: { user: true },
      })

      if (parent) {
        parents.unshift(parent)
        parentId = parent.parentId
      } else {
        parentId = null
      }
    }

    return {
      ...post,
      likedByMe: post.likes?.length > 0,
      parents,
      children: post.children.map(({ likes, ...child }) => ({
        ...child,
        likedByMe: likes?.length > 0,
      })),
    }
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

  async toggleLike(postId: string, userId: string): Promise<any> {
    const post = await this.prisma.post.findUnique({ where: { id: postId } })

    if (!post) throw new NotFoundException('Post not found')

    const like = await this.prisma.like.findUnique({
      where: { userId_postId: { postId, userId } },
    })

    if (like) {
      await this.prisma.like.delete({
        where: { userId_postId: { postId, userId } },
      })
    } else {
      await this.prisma.like.create({
        data: { postId, userId },
      })
    }

    return this.findUnique(postId, userId)
  }
}
