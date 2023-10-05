import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export default class GetPostArgs {
  @Field(() => String)
  id: string
}
