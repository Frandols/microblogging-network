import { Field, ObjectType } from '@nestjs/graphql'
import User from '../../users/models/user.model'

@ObjectType({ description: 'post' })
export default class Post {
  @Field()
  id: number

  @Field()
  content: string

  @Field(() => User, { nullable: true })
  user: User

  @Field(() => Post, { nullable: true })
  parent: Post

  @Field(() => [Post])
  children: Post[]
}
