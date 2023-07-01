import { Injectable } from '@nestjs/common'
import PrismaService from 'src/prisma/prisma.service'
import UsersService from 'src/users/users.service'

@Injectable()
export default class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async create(token: string, post: { content: string; parentId: number }) {
    const { id: userId } = await this.usersService.getGitHubAPIUser(token)

    const parent = await this.prisma.post.findUnique({
      where: { id: post.parentId },
    })

    if (!parent) throw new Error('Parent not found')

    return this.prisma.post.create({
      data: {
        userId,
        ...{
          content: post.content,
          parentId: parent.id,
        },
      },
    })
  }

  async findMany(parentId: number | null) {
    if (!parentId) {
      const children = await this.prisma.post.findMany({
        where: { parentId: null },
        include: {
          user: true,
        },
      })

      return {
        parent: null,
        children,
      }
    }

    const parent = await this.prisma.post.findUnique({
      where: { id: parentId },
      include: {
        user: true,
        parent: true,
        children: {
          include: {
            user: true,
          },
        },
      },
    })

    if (!parent) throw new Error('Parent not found')

    return {
      parent: {
        id: parent.id,
        content: parent.content,
        user: parent.user,
        parent: parent.parent,
      },
      children: parent.children,
    }
  }
}
