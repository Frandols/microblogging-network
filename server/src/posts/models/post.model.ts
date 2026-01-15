import { Field, ObjectType } from '@nestjs/graphql'
import User from '../../users/models/user.model'

@ObjectType()
class ChildrenCount {
  @Field()
  children: number

  @Field()
  likes: number
}

@ObjectType({ description: 'post' })
export default class Post {
  @Field()
  id: string

  @Field()
  content: string

  @Field(() => Date)
  updatedAt: Date

  @Field(() => User)
  user: User

  @Field(() => Post, { nullable: true })
  parent: Post

  @Field(() => [Post])
  children: Post[]

  @Field(() => [Post])
  parents: Post[]

  @Field()
  likedByMe: boolean

  @Field(() => ChildrenCount)
  _count: ChildrenCount
}
