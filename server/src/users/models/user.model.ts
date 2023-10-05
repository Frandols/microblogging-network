import { Field, ObjectType } from '@nestjs/graphql'
import Post from '../../posts/models/post.model'

@ObjectType({ description: 'user' })
export default class User {
  @Field()
  id: string

  @Field()
  name: string

  @Field()
  avatar: string

  @Field(() => [Post])
  posts: Post[]
}
