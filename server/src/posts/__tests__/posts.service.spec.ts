import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { Post } from '@prisma/client'
import PrismaService from '../../prisma/prisma.service'
import PostsService, {
  CreatePostPayload,
  UpdatePostPayload,
} from '../posts.service'

describe('PostsService', () => {
  let postsService: PostsService
  let prismaService: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: PrismaService,
          useValue: {
            post: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile()

    postsService = module.get<PostsService>(PostsService)
    prismaService = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(postsService).toBeDefined()
  })

  describe('create', () => {
    it('should create a post', async () => {
      const mockPayload: CreatePostPayload = {
        content: 'Test post',
        userId: '1',
        parentId: null,
      }

      const mockPost: Post = {
        id: '1',
        updatedAt: new Date(Date.now()),
        ...mockPayload,
      }

      jest.spyOn(prismaService.post, 'create').mockResolvedValue(mockPost)

      const result = await postsService.create(mockPayload)

      expect(result).toEqual(mockPost)
      expect(prismaService.post.create).toHaveBeenCalledWith({
        data: mockPayload,
        include: {
          parent: true,
          user: true,
        },
      })
    })

    it('should throw NotFoundException if parent not found', async () => {
      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(null)

      const result = await postsService
        .create({
          content: 'Test post',
          userId: '1',
          parentId: '1',
        })
        .catch((error) => error)

      await expect(result).toBeInstanceOf(NotFoundException)
    })
  })

  describe('findMany', () => {
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

      jest.spyOn(prismaService.post, 'findMany').mockResolvedValue(mockPosts)

      const result = await postsService.findMany()

      expect(result).toEqual(mockPosts)
      expect(prismaService.post.findMany).toHaveBeenCalledWith({
        where: { parentId: null },
        include: {
          user: true,
          _count: {
            select: { children: true },
          },
        },
      })
    })
  })

  describe('findUnique', () => {
    it('should find an unique post', async () => {
      const mockPost: Post = {
        id: '1',
        content: 'Test post',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
      }

      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(mockPost)

      const result = await postsService.findUnique(mockPost.id)

      expect(result).toEqual(mockPost)
      expect(prismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: mockPost.id },
        include: {
          user: true,
          children: {
            include: { user: true, _count: { select: { children: true } } },
          },
        },
      })
    })
  })

  describe('update', () => {
    it('should update a post', async () => {
      const mockPayload: UpdatePostPayload = {
        content: 'Test post',
      }

      const mockPost: Post = {
        id: '1',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
        ...mockPayload,
      }

      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(mockPost)

      jest.spyOn(prismaService.post, 'update').mockResolvedValue(mockPost)

      const result = await postsService.update(
        mockPost.id,
        mockPost.userId,
        mockPayload,
      )

      expect(result).toEqual(mockPost)
      expect(prismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: mockPost.id },
      })
      expect(prismaService.post.update).toHaveBeenCalledWith({
        where: { id: mockPost.id },
        data: { content: mockPost.content },
      })
    })

    it('should throw NotFoundException if post not found', async () => {
      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(null)

      const result = await postsService
        .update('1', '1', {
          content: 'Test post',
        })
        .catch((error) => error)

      await expect(result).toBeInstanceOf(NotFoundException)
    })

    it('should throw UnauthorizedException if user is not post owner', async () => {
      const mockPayload: UpdatePostPayload = {
        content: 'Test post',
      }

      const mockPost: Post = {
        id: '1',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
        ...mockPayload,
      }

      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(mockPost)

      const result = await postsService
        .update(mockPost.id, '2', mockPayload)
        .catch((error) => error)

      await expect(result).toBeInstanceOf(UnauthorizedException)
    })
  })

  describe('delete', () => {
    it('should delete post', async () => {
      const mockPost: Post = {
        id: '1',
        content: 'Test post',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
      }

      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(mockPost)

      jest.spyOn(prismaService.post, 'delete').mockResolvedValue(mockPost)

      const result = await postsService.delete(mockPost.id, mockPost.userId)

      expect(result).toEqual(mockPost)
      expect(prismaService.post.findUnique).toHaveBeenCalledWith({
        where: { id: mockPost.id },
      })
      expect(prismaService.post.delete).toHaveBeenCalledWith({
        where: { id: mockPost.id },
      })
    })

    it('should throw NotFoundException if post not found', async () => {
      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(null)

      const result = await postsService.delete('1', '1').catch((error) => error)

      await expect(result).toBeInstanceOf(NotFoundException)
    })

    it('should throw UnauthorizedException if user is not post owner', async () => {
      const mockPost: Post = {
        id: '1',
        content: 'Test post',
        updatedAt: new Date(Date.now()),
        userId: '1',
        parentId: null,
      }

      jest.spyOn(prismaService.post, 'findUnique').mockResolvedValue(mockPost)

      const result = await postsService
        .delete(mockPost.id, '2')
        .catch((error) => error)

      expect(result).toBeInstanceOf(UnauthorizedException)
    })
  })
})
