import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export default class UpdatePostArgs {
  @Field(() => String)
  id: string
}
