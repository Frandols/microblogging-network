import { ObjectType, Field } from '@nestjs/graphql'
import Post from '../models/post.model'

@ObjectType()
export default class GetPostsOutput {
  @Field(() => Post, { nullable: true })
  parent: Post

  @Field(() => [Post])
  children: Post[]
}
