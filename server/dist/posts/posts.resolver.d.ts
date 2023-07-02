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
    getPosts(getPostsArgs: GetPostsArgs): Promise<({
        user: import("@prisma/client/runtime").GetResult<{
            id: number;
            name: string;
        }, unknown> & {};
    } & import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        userId: number;
        parentId: number | null;
    }, unknown> & {})[]>;
}
