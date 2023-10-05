import { Field, InputType } from '@nestjs/graphql'
import { MaxLength, MinLength } from 'class-validator'

@InputType()
export default class CreatePostInput {
  @Field()
  @MinLength(1)
  @MaxLength(140)
  content: string
}
