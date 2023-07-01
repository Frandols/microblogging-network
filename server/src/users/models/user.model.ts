import { ObjectType, Field } from '@nestjs/graphql'

@ObjectType({ description: 'user' })
export default class User {
  @Field()
  id: number

  @Field()
  name: string
}
