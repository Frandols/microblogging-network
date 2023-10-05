import { Module } from '@nestjs/common'
import PrismaModule from '../prisma/prisma.module'
import UsersService from '../users/users.service'
import PostsResolver from './posts.resolver'
import PostsService from './posts.service'

@Module({
  providers: [PostsResolver, PostsService, UsersService],
  imports: [PrismaModule],
})
export default class PostsModule {}
