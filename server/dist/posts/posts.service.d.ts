import PrismaService from 'src/prisma/prisma.service';
import UsersService from 'src/users/users.service';
export default class PostsService {
    private readonly usersService;
    private readonly prisma;
    constructor(usersService: UsersService, prisma: PrismaService);
    create(token: string, post: {
        content: string;
        parentId: number;
    }): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        updatedAt: Date;
        userId: number;
        parentId: number | null;
    }, unknown> & {}>;
    findMany(parentId: number): Promise<({
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
}
