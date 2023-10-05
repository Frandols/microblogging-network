import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export default class UpdatePostInput {
  @Field()
  @MaxLength(140)
  content: string
}
