import { Injectable } from '@nestjs/common'
import PrismaService from 'src/prisma/prisma.service'
import axios from 'axios'

type GitHubAPIUserResponse = {
  id: number
  login: string
  avatar_url: string
}

@Injectable()
export default class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getGitHubAPIUser(token: string) {
    const response = await axios.get<GitHubAPIUserResponse>(
      'https://api.github.com/user',
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  }

  async upsert(token: string) {
    const gitHubUser = await this.getGitHubAPIUser(token)

    await this.prisma.user.upsert({
      where: { id: gitHubUser.id },
      update: { name: gitHubUser.login },
      create: {
        id: gitHubUser.id,
        name: gitHubUser.login,
      },
    })
  }
}
