import { InputType, Field, Int } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export default class CreatePostInput {
  @Field()
  @MaxLength(140)
  content: string

  @Field(() => Int, { nullable: true })
  parentId: number
}
