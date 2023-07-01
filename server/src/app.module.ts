import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import TokensModule from './tokens/tokens.module'
import PostsModule from './posts/posts.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    TokensModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
