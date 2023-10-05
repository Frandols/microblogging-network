import { UseGuards } from '@nestjs/common'
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { User } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
import TokensGuard from '../tokens/guards/tokens.guard'
import CreatePostArgs from './dto/create-post.args'
import CreatePostInput from './dto/create-post.input'
import DeletePostArgs from './dto/delete-post.args'
import GetPostArgs from './dto/get-post.args'
import UpdatePostArgs from './dto/update-post.args'
import UpdatePostInput from './dto/update-post.input'
import Post from './models/post.model'
import PostsService from './posts.service'

export interface ProtectedByTokensGuardRouteContext {
  user: Pick<User, 'id'>
}

const pubSub = new PubSub()

@Resolver('Post')
export default class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  @UseGuards(TokensGuard)
  async createPost(
    @Args() args: CreatePostArgs,
    @Args('payload') payload: CreatePostInput,
    @Context('req') context: ProtectedByTokensGuardRouteContext,
  ) {
    const post = await this.postsService.create({
      ...payload,
      userId: context.user.id,
      parentId: args.parentId || null,
    })

    pubSub.publish('replyReceived', {
      replyReceived: post,
    })

    return post
  }

  @Subscription(() => Post, {
    filter: async ({ replyReceived }, _, context: { user: string }) => {
      if (replyReceived.parent === null) return false

      if (replyReceived.parent.userId === replyReceived.userId) return false

      return replyReceived.parent.userId === context.user
    },
  })
  replyReceived() {
    return pubSub.asyncIterator('replyReceived')
  }

  @Query(() => [Post])
  posts() {
    return this.postsService.findMany()
  }

  @Query(() => Post)
  post(@Args() getPostArgs: GetPostArgs) {
    return this.postsService.findUnique(getPostArgs.id)
  }

  @Mutation(() => Post)
  @UseGuards(TokensGuard)
  updatePost(
    @Args() args: UpdatePostArgs,
    @Args('payload') payload: UpdatePostInput,
    @Context('req') context: ProtectedByTokensGuardRouteContext,
  ) {
    return this.postsService.update(args.id, context.user.id, payload)
  }

  @Query(() => Post)
  @UseGuards(TokensGuard)
  deletePost(
    @Args() args: DeletePostArgs,
    @Context('req') context: ProtectedByTokensGuardRouteContext,
  ) {
    return this.postsService.delete(args.id, context.user.id)
  }
}
