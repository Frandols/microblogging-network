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

  async findMany() {
    return this.prisma.post.findMany({
      where: { parentId: null },
      include: {
        user: true,
        _count: {
          select: { children: true },
        },
      },
    })
  }

  async findUnique(id: number) {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        user: true,
        children: {
          include: { user: true, _count: { select: { children: true } } },
        },
      },
    })
  }
}
