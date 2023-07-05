import PostsService from './posts.service';
import CreatePostInput from './dto/create-post.input';
import GetPostArgs from './dto/get-post.args';
export default class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost(createPostInput: CreatePostInput, req: Request & {
        token: string;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        updatedAt: Date;
        userId: number;
        parentId: number | null;
    }, unknown> & {}>;
    getPosts(): Promise<({
        user: import("@prisma/client/runtime").GetResult<{
            id: number;
            name: string;
        }, unknown> & {};
        _count: {
            children: number;
        };
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        updatedAt: Date;
        userId: number;
        parentId: number | null;
    }, unknown> & {})[]>;
    getPost(getPostArgs: GetPostArgs): Promise<({
        user: import("@prisma/client/runtime").GetResult<{
            id: number;
            name: string;
        }, unknown> & {};
        children: ({
            user: import("@prisma/client/runtime").GetResult<{
                id: number;
                name: string;
            }, unknown> & {};
            _count: {
                children: number;
            };
        } & import("@prisma/client/runtime").GetResult<{
            id: number;
            content: string;
            updatedAt: Date;
            userId: number;
            parentId: number | null;
        }, unknown> & {})[];
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        updatedAt: Date;
        userId: number;
        parentId: number | null;
    }, unknown> & {}) | null>;
}
