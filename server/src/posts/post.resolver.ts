import { Resolver, Mutation, Query } from '@nestjs/graphql'
import PostsService from './posts.service'
import Post from './models/post.model'

@Resolver('Post')
export default class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  async createPost() {
    console.log('holis')

    return { id: 0, content: 'hola' }
  }

  @Query(() => [Post])
  async getPosts() {
    return this.postsService.findMany()
  }
}
