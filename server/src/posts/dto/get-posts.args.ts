import { ArgsType, Field, Int } from '@nestjs/graphql'

@ArgsType()
export default class GetPostsArgs {
  @Field(() => Int, { nullable: true })
  parentId: number
}
