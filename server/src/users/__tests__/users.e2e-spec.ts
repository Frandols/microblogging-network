import { ApolloDriver } from '@nestjs/apollo'
import { INestApplication } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import * as request from 'supertest'
import PrismaModule from '../../prisma/prisma.module'
import UsersResolver from '../users.resolver'
import UsersService from '../users.service'

describe('UsersResolver (e2e)', () => {
  let app: INestApplication
  let usersService: UsersService
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
      providers: [UsersResolver, UsersService, JwtService],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()

    usersService = app.get<UsersService>(UsersService)
    jwtService = app.get<JwtService>(JwtService)
  })

  afterAll(async () => {
    await app.close()
  })

  describe('user', () => {
    it('should return a user', () => {
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        avatar: 'avatar.png',
        authProvider: 'someProvider',
        authProviderUserId: '123',
      }

      jest.spyOn(usersService, 'findUnique').mockResolvedValue(mockUser)

      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `{
            user(id: "1") {
              id
              name
            }
          }`,
        })
        .expect(200)
        .expect((response) => {
          const user = response.body.data.user

          expect(user).toEqual({
            id: mockUser.id,
            name: mockUser.name,
          })
        })
    })
  })

  describe('me', () => {
    it('should return my user', () => {
      const mockUser: User = {
        id: '1',
        name: 'Test User',
        avatar: 'avatar.png',
        authProvider: 'someProvider',
        authProviderUserId: '123',
      }

      jest
        .spyOn(jwtService, 'verifyAsync')
        .mockResolvedValue({ id: mockUser.id })

      jest.spyOn(usersService, 'findUnique').mockResolvedValue(mockUser)

      return request(app.getHttpServer())
        .post('/graphql')
        .set('Authorization', 'Bearer someToken')
        .send({
          query: `{
            me {
              id
              name
            }
          }`,
        })
        .expect(200)
        .expect((response) => {
          const me = response.body.data.me

          expect(me).toEqual({
            id: mockUser.id,
            name: mockUser.name,
          })
        })
    })

    it('should return "Unauthorized" when accessing me query without authentication', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query: `{
            me {
              id
              name
            }
          }`,
        })
        .expect(200)
        .expect((response) => {
          const errors = response.body.errors

          expect(errors[0].message).toBe('Unauthorized')
        })
    })
  })
})
