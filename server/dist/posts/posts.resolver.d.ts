import PostsService from './posts.service';
import CreatePostInput from './dto/create-post.input';
import GetPostsArgs from './dto/get-posts.args';
export default class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost(createPostInput: CreatePostInput, req: Request & {
        token: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        userId: number;
        parentId: number | null;
    }, unknown> & {}>;
    getPosts(getPostsArgs: GetPostsArgs): Promise<{
        parent: null;
        children: ({
            user: import("@prisma/client/runtime").GetResult<{
                id: number;
                name: string;
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            content: string;
            userId: number;
            parentId: number | null;
        }, unknown> & {})[];
    } | {
        parent: {
            id: number;
            content: string;
            user: import("@prisma/client/runtime").GetResult<{
                id: number;
                name: string;
            }, unknown> & {};
            parent: (import("@prisma/client/runtime").GetResult<{
                id: number;
                content: string;
                userId: number;
                parentId: number | null;
            }, unknown> & {}) | null;
        };
        children: ({
            user: import("@prisma/client/runtime").GetResult<{
                id: number;
                name: string;
            }, unknown> & {};
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            content: string;
            userId: number;
            parentId: number | null;
        }, unknown> & {})[];
    }>;
}
