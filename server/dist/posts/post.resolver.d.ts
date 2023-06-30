import PostsService from './posts.service';
export default class PostsResolver {
    private readonly postsService;
    constructor(postsService: PostsService);
    createPost(): Promise<{
        id: number;
        content: string;
    }>;
    getPosts(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        userId: number;
        parentId: number | null;
    }, unknown> & {})[]>;
}
