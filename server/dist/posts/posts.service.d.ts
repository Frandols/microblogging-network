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
        userId: number;
        parentId: number | null;
    }, unknown> & {}>;
    findMany(parentId: number | null): Promise<{
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
