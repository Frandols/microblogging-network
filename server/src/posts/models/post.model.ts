import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType({ description: 'post' })
export default class Post {
  @Field(() => ID)
  id: number

  @Field()
  content: string
}
