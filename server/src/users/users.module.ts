import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import PrismaModule from '../prisma/prisma.module'
import UsersResolver from './users.resolver'
import UsersService from './users.service'

@Module({
  providers: [UsersResolver, UsersService, JwtService],
  imports: [PrismaModule],
})
export default class UsersModule {}
