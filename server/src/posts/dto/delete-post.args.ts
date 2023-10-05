import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export default class DeletePostArgs {
  @Field(() => String)
  id: string
}
