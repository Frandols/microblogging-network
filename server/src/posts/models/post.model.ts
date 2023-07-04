import { Field, ObjectType } from '@nestjs/graphql'
import User from '../../users/models/user.model'

@ObjectType()
class Count {
  @Field()
  children: number
}

@ObjectType({ description: 'post' })
export default class Post {
  @Field()
  id: number

  @Field()
  content: string

  @Field(() => User)
  user: User

  @Field(() => Date)
  updatedAt: Date

  @Field(() => Post, { nullable: true })
  parent: Post

  @Field(() => [Post])
  children: Post[]

  @Field(() => Count)
  _count: Count
}
