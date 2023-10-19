import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import config from '../../config'
import PrismaModule from '../prisma/prisma.module'
import UsersService from '../users/users.service'
import TokensController from './tokens.controller'
import TokensService from './tokens.service'

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: config.jwtSecret,
    }),
  ],
  controllers: [TokensController],
  providers: [TokensService, UsersService],
})
export default class TokensModule {}
