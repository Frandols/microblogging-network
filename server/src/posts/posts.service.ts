import { Injectable } from '@nestjs/common'
import PrismaService from 'src/prisma/prisma.service'
import UsersService from 'src/users/users.service'

@Injectable()
export default class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  async create(token: string, content: string) {
    const { id } = await this.usersService.getGitHubAPIUser(token)

    return this.prisma.post.create({
      data: {
        userId: id,
        content,
      },
    })
  }

  async findMany() {
    return this.prisma.post.findMany({})
  }
}
