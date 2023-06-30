import { Module } from '@nestjs/common'
import TokensController from './tokens.controller'
import TokensService from './tokens.service'
import PrismaModule from 'src/prisma/prisma.module'
import UsersService from 'src/users/users.service'

@Module({
  imports: [PrismaModule],
  controllers: [TokensController],
  providers: [TokensService, UsersService],
})
export default class TokensModule {}
