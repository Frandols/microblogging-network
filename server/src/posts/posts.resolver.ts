import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql'
import PostsService from './posts.service'
import Post from './models/post.model'
import CreatePostInput from './dto/create-post.input'
import { UseGuards } from '@nestjs/common'
import AuthGuard from '../auth/auth.guard'
import GetPostArgs from './dto/get-post.args'

@Resolver('Post')
export default class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  async createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context('req') req: Request & { token: string },
  ) {
    return this.postsService.create(req.token, createPostInput)
  }

  @Query(() => [Post])
  async getPosts() {
    return this.postsService.findMany()
  }

  @Query(() => Post)
  async getPost(@Args() getPostArgs: GetPostArgs) {
    return this.postsService.findUnique(getPostArgs.id)
  }
}
