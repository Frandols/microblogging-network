import { ApolloDriver } from '@nestjs/apollo'
import { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Post, User } from '@prisma/client'
import * as request from 'supertest'
import PrismaModule from '../../prisma/prisma.module'
import CreatePostArgs from '../dto/create-post.args'
import CreatePostInput from '../dto/create-post.input'
import UpdatePostInput from '../dto/update-post.input'
import PostsResolver from '../posts.resolver'
import PostsService from '../posts.service'

describe('PostsResolver (e2e)', () => {
  let app: INestApplication
  let postsService: PostsService
  let jwtService: JwtService

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        GraphQLModule.forRoot({
          autoSchemaFile: true,
          driver: ApolloDriver,
        }),
        PrismaModule,
      ],
      providers: [PostsResolver, PostsService, JwtService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    postsService = app.get<PostsService>(PostsService)
    jwtService = app.get<JwtService>(JwtService)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('createPost', () => {
    it('should create a post', async () => {
      const mockArgs: CreatePostArgs = {
        parentId: null,
      }

      const mockPayload: CreatePostInput = {
        content: 'Test post',
      }

      const mockPost: Post = {
        id: '1',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
        ...mockPayload,
      }

      const mockUser: Pick<User, 'id'> = { id: mockPost.userId }

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockUser)

      jest
        .spyOn(postsService, 'create')
        .mockResolvedValue(mockPost as Post & { parent: Post; user: User })

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', 'Bearer someToken')
        .send({
          query: `
              mutation {
                createPost(payload: { content: "${mockPayload.content}" }) {
                  id
                  content
                }
              }
            `,
        })
        .expect(200)
        .expect((response) => {
          const post = response.body.data.createPost

          expect(post).toEqual({
            id: mockPost.id,
            content: mockPost.content,
          })
        })

      expect(postsService.create).toHaveBeenCalledWith({
        ...mockPayload,
        userId: mockUser.id,
        ...mockArgs,
      })
    })

    it('should return "Unauthorized" if "Authorization" header is not provided', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
              mutation {
                createPost(payload: { content: "Test post" }) {
                  id
                  content
                }
              }
            `,
        })
        .expect(200)
        .expect((response) => {
          const error = response.body.errors[0]

          expect(error.message).toEqual('Unauthorized')
        })
    })
  })

  describe('posts', () => {
    it('should find many posts', () => {
      const mockPosts: Post[] = [
        {
          id: '1',
          content: 'Test post',
          updatedAt: new Date(Date.now()),
          userId: '1',
          parentId: null,
        },
      ]

      jest.spyOn(postsService, 'findMany').mockResolvedValue(mockPosts)

      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
              {
                posts {
                  id
                  content
                }
              }
            `,
        })
        .expect(200)
        .expect((response) => {
          const posts = response.body.data.posts

          posts.forEach((post: Pick<Post, 'id' | 'content'>, index: number) => {
            expect(post).toEqual({
              id: mockPosts[index].id,
              content: mockPosts[index].content,
            })
          })
        })
    })
  })

  describe('post', () => {
    it('should find an unique post', async () => {
      const mockPost: Post = {
        id: '1',
        content: 'Test post',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
      }

      jest.spyOn(postsService, 'findUnique').mockResolvedValue(mockPost)

      await request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
              {
                post(id: "${mockPost.id}") {
                  id
                  content
                }
              }
            `,
        })
        .expect(200)
        .expect((response) => {
          const post = response.body.data.post

          expect(post).toEqual({
            id: mockPost.id,
            content: mockPost.content,
          })
        })

      expect(postsService.findUnique).toHaveBeenCalledWith(mockPost.id)
    })
  })

  describe('updatePost', () => {
    it('should update a post', async () => {
      const mockPayload: UpdatePostInput = {
        content: 'Test post',
      }

      const mockPost: Post = {
        id: '1',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
        ...mockPayload,
      }

      const mockUser: Pick<User, 'id'> = { id: mockPost.userId }

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockUser)

      jest.spyOn(postsService, 'update').mockResolvedValue(mockPost)

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', 'Bearer someToken')
        .send({
          query: `
              mutation {
                updatePost(id: "${mockPost.id}", payload: { content: "${mockPost.content}" }) {
                  id
                  content
                }
              }
            `,
        })
        .expect(200)
        .expect((response) => {
          const post = response.body.data.updatePost

          expect(post).toEqual({
            id: mockPost.id,
            content: mockPost.content,
          })
        })

      expect(postsService.update).toHaveBeenCalledWith(
        mockPost.id,
        mockUser.id,
        mockPayload,
      )
    })

    it('should return "Unauthorized" if "Authorization" header is not provided', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
              mutation {
                updatePost(id: "1", payload: { content: "Test post" }) {
                  id
                  content
                }
              }
            `,
        })
        .expect(200)
        .expect((response) => {
          const error = response.body.errors[0]

          expect(error.message).toEqual('Unauthorized')
        })
    })
  })

  describe('deletePost', () => {
    it('should delete a post', async () => {
      const mockPost: Post = {
        id: '1',
        content: 'Test post',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
      }

      const mockUser: Pick<User, 'id'> = { id: mockPost.userId }

      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockUser)

      jest.spyOn(postsService, 'delete').mockResolvedValue(mockPost)

      await request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', 'Bearer someToken')
        .send({
          query: `
              {
                deletePost(id: "${mockPost.id}") {
                  id
                  content
                }
              }
            `,
        })
        .expect(200)
        .expect((response) => {
          const post = response.body.data.deletePost

          expect(post).toEqual({
            id: mockPost.id,
            content: mockPost.content,
          })
        })

      expect(postsService.delete).toHaveBeenCalledWith(mockPost.id, mockUser.id)
    })

    it('should return "Unauthorized" if "Authorization" header is not provided', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `
              {
                deletePost(id: "1") {
                  id
                  content
                }
              }
            `,
        })
        .expect(200)
        .expect((response) => {
          const error = response.body.errors[0]

          expect(error.message).toEqual('Unauthorized')
        })
    })
  })
})
