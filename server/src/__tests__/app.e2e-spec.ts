import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import config from '../../config'
import { AppModule } from '../app.module'
import CreatePostInput from '../posts/dto/create-post.input'
import DeletePostArgs from '../posts/dto/delete-post.args'
import UpdatePostArgs from '../posts/dto/update-post.args'
import UpdatePostInput from '../posts/dto/update-post.input'
import PrismaService from '../prisma/prisma.service'
import GitHubStrategy from '../tokens/strategies/github.strategy'
import { CreateUserPayload } from '../users/users.service'

const createUserPayload: CreateUserPayload = {
  name: 'Test User',
  avatar: 'avatar.png',
  authProvider: 'github',
  authProviderUserId: 'github123',
}

describe('AppController (e2e)', () => {
  let app: INestApplication
  let gitHubStrategy: GitHubStrategy
  let jwtService: JwtService
  let prismaService: PrismaService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication()
    await app.init()

    gitHubStrategy = app.get<GitHubStrategy>(GitHubStrategy)
    jwtService = app.get<JwtService>(JwtService)
    prismaService = app.get<PrismaService>(PrismaService)
  })

  afterAll(async () => {
    await prismaService.user.delete({
      where: {
        authProvider_authProviderUserId: {
          authProvider: createUserPayload.authProvider,
          authProviderUserId: createUserPayload.authProviderUserId,
        },
      },
    })

    await app.close()
  })

  let token: string

  it('should get a valid token', () => {
    jest.spyOn(gitHubStrategy, 'findUser').mockResolvedValue(createUserPayload)

    const validCode: string = 'validCode'
    const validProvider: string = 'github'

    return request(app.getHttpServer())
      .get('/tokens')
      .query({ code: validCode, provider: validProvider })
      .expect(200)
      .expect((response) => {
        token = response.text

        expect(token).toBeDefined()
      })
  })

  let me: { id: string }

  it('should get my user', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
					{
						me {
							id
						}
					}`,
      })
      .expect(200)
      .expect((response) => {
        me = response.body.data.me

        expect(me).toBeDefined()
        jwtService
          .verifyAsync(token, { secret: config.jwtSecret })
          .then((decoded) => {
            expect(decoded.id).toEqual(me.id)
          })
      })
  })

  let post: { id: string }

  it('should create a post with my user', () => {
    const payload: CreatePostInput = {
      content: 'Test post',
    }

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
						mutation {
							createPost(payload: { content: "${payload.content}" }) {
								id
							}
						}
					`,
      })
      .expect(200)
      .expect((response) => {
        post = response.body.data.createPost

        expect(post).toBeDefined()
        prismaService.post
          .findUnique({ where: { id: post.id } })
          .then((post) => {
            expect(post?.userId).toEqual(me.id)
          })
      })
  })

  it('should get a list of posts with created post included', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
						{
							posts {
								id
							}
						}
					`,
      })
      .expect(200)
      .expect((response) => {
        const posts = response.body.data.posts

        expect(posts.find(({ id }: { id: string }) => id === post.id)).toEqual(
          post,
        )
      })
  })

  it('should update post', () => {
    const args: UpdatePostArgs = {
      id: post.id,
    }

    const payload: UpdatePostInput = {
      content: 'Updated test post',
    }

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
						mutation {
							updatePost(id: "${args.id}", payload: { content: "${payload.content}" }) {
								id
								content
							}
						}
					`,
      })
      .expect(200)
      .expect((response) => {
        const post = response.body.data.updatePost

        expect(post).toBeDefined()
        expect(post).toEqual({
          id: args.id,
          content: payload.content,
        })
      })
  })

  it('should delete created post', () => {
    const args: DeletePostArgs = { id: post.id }

    return request(app.getHttpServer())
      .post('/graphql')
      .set('Authorization', `Bearer ${token}`)
      .send({
        query: `
						{
							deletePost(id: "${args.id}") {
								id
							}
						}
					`,
      })
      .expect(200)
      .expect((response) => {
        const post = response.body.data.deletePost

        expect(post).toBeDefined()
        expect(post).toEqual({
          id: args.id,
        })
      })
  })
})
