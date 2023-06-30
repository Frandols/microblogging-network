import { Module } from '@nestjs/common'
import PostsResolver from './post.resolver'
import PostsService from './posts.service'
import PrismaModule from 'src/prisma/prisma.module'
import UsersService from 'src/users/users.service'

@Module({
  providers: [PostsResolver, PostsService, UsersService],
  imports: [PrismaModule],
})
export default class PostsModule {}
