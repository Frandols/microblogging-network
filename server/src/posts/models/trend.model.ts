import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export default class Trend {
  @Field()
  tag: string

  @Field()
  count: number
}
