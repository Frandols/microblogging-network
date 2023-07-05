import { Field, Int, ArgsType } from '@nestjs/graphql'

@ArgsType()
export default class GetPostArgs {
  @Field(() => Int)
  id: number
}
