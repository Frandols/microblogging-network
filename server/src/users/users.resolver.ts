import { UseGuards } from '@nestjs/common'
import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import TokensGuard from '../tokens/guards/tokens.guard'
import User from './models/user.model'
import UsersService from './users.service'

@Resolver('User')
export default class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return await this.usersService.findUnique(id)
  }

  @Query(() => User)
  @UseGuards(TokensGuard)
  async me(@Context('req') req: { user: { id: string } }) {
    return await this.usersService.findUnique(req.user.id)
  }
}
