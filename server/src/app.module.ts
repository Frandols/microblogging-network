import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import config from '../config'
import PostsModule from './posts/posts.module'
import TokensModule from './tokens/tokens.module'
import UsersModule from './users/users.module'

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'client', 'dist'),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      useGlobalPrefix: true,
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'subscriptions-transport-ws': {
          onConnect: async (context: { Authorization: string }) => {
            const authorization = context.Authorization

            if (!authorization) return

            const [type, token] = authorization?.split(' ') ?? []

            if (type !== 'Bearer' || !token) return

            const jwtService = new JwtService({ secret: config.jwtSecret })

            const payload = await jwtService.verifyAsync(token)

            if (!payload.id) return

            return { user: payload.id }
          },
        },
      },
    }),
    TokensModule,
    PostsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
