import { UseGuards } from '@nestjs/common'
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
import config from '../../config'
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
  constructor(
    private readonly postsService: PostsService,
    private readonly jwtService: JwtService,
  ) {}

  private extractUserIdFromToken(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? []

    if (type !== 'Bearer' || !token) return undefined

    try {
      const payload = this.jwtService.verify(token, {
        secret: config.jwtSecret,
      })
      return payload.id
    } catch {
      return undefined
    }
  }

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
  posts(@Context('req') request: any) {
    const userId = this.extractUserIdFromToken(request)
    return this.postsService.findMany(userId)
  }

  @Query(() => Post)
  post(@Args() getPostArgs: GetPostArgs, @Context('req') request: any) {
    const userId = this.extractUserIdFromToken(request)
    return this.postsService.findUnique(getPostArgs.id, userId)
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

  @Mutation(() => Post)
  @UseGuards(TokensGuard)
  toggleLike(
    @Args('postId') postId: string,
    @Context('req') context: ProtectedByTokensGuardRouteContext,
  ) {
    return this.postsService.toggleLike(postId, context.user.id)
  }
}
