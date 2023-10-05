import { ArgsType, Field } from '@nestjs/graphql'

@ArgsType()
export default class CreatePostArgs {
  @Field(() => String, { nullable: true })
  parentId: string | null
}
