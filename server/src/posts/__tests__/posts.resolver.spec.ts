import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { Post, User } from '@prisma/client'
import PrismaModule from '../../prisma/prisma.module'
import CreatePostArgs from '../dto/create-post.args'
import CreatePostInput from '../dto/create-post.input'
import DeletePostArgs from '../dto/delete-post.args'
import GetPostArgs from '../dto/get-post.args'
import UpdatePostArgs from '../dto/update-post.args'
import UpdatePostInput from '../dto/update-post.input'
import PostsResolver, {
  ProtectedByTokensGuardRouteContext,
} from '../posts.resolver'
import PostsService from '../posts.service'

describe('PostsResolver', () => {
  let postsResolver: PostsResolver
  let postsService: PostsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsResolver,
        {
          provide: PostsService,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
        JwtService,
      ],
      imports: [PrismaModule],
    }).compile()

    postsResolver = await module.get<PostsResolver>(PostsResolver)
    postsService = await module.get<PostsService>(PostsService)
  })

  it('should be defined', () => {
    expect(postsResolver).toBeDefined()
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
        ...mockArgs,
        ...mockPayload,
      }

      const mockContext: ProtectedByTokensGuardRouteContext = {
        user: {
          id: '1',
        },
      }

      jest
        .spyOn(postsService, 'create')
        .mockResolvedValue(mockPost as Post & { parent: Post; user: User })

      const result = await postsResolver.createPost(
        mockArgs,
        mockPayload,
        mockContext,
      )

      expect(result).toEqual(mockPost)
      expect(postsService.create).toHaveBeenCalledWith({
        ...mockPayload,
        userId: mockContext.user.id,
        ...mockArgs,
      })
    })
  })

  describe('posts', () => {
    it('should find many posts', async () => {
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

      const result = await postsResolver.posts()

      expect(result).toEqual(mockPosts)
    })
  })

  describe('post', () => {
    it('should find an unique post', async () => {
      const mockQuery: GetPostArgs = {
        id: '1',
      }

      const mockPost: Post = {
        content: 'Test post',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
        ...mockQuery,
      }

      jest.spyOn(postsService, 'findUnique').mockResolvedValue(mockPost)

      const result = await postsResolver.post(mockQuery)

      expect(result).toEqual(mockPost)
      expect(postsService.findUnique).toBeCalledWith(mockQuery.id)
    })
  })

  describe('updatePost', () => {
    it('should update a post', async () => {
      const mockQuery: UpdatePostArgs = {
        id: '1',
      }

      const mockPayload: UpdatePostInput = {
        content: 'Test post',
      }

      const mockPost: Post = {
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
        ...mockQuery,
        ...mockPayload,
      }

      const mockContext: ProtectedByTokensGuardRouteContext = {
        user: {
          id: '1',
        },
      }

      jest.spyOn(postsService, 'update').mockResolvedValue(mockPost)

      const result = await postsResolver.updatePost(
        mockQuery,
        mockPayload,
        mockContext,
      )

      expect(result).toEqual(mockPost)
      expect(postsService.update).toHaveBeenCalledWith(
        mockQuery.id,
        mockContext.user.id,
        mockPayload,
      )
    })
  })

  describe('deletePost', () => {
    it('should return a post with the deleted content', async () => {
      const mockQuery: DeletePostArgs = {
        id: '1',
      }

      const mockPost: Post = {
        content: 'Test post',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
        ...mockQuery,
      }

      const mockContext: ProtectedByTokensGuardRouteContext = {
        user: {
          id: '1',
        },
      }

      jest.spyOn(postsService, 'delete').mockResolvedValue(mockPost)

      const result = await postsResolver.deletePost(mockQuery, mockContext)

      expect(result).toEqual(mockPost)
    })
  })
})
