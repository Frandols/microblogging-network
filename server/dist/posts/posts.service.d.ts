import PrismaService from 'src/prisma/prisma.service';
import UsersService from 'src/users/users.service';
export default class PostsService {
    private readonly usersService;
    private readonly prisma;
    constructor(usersService: UsersService, prisma: PrismaService);
    create(token: string, content: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        userId: number;
        parentId: number | null;
    }, unknown> & {}>;
    findMany(): Promise<(import("@prisma/client/runtime").GetResult<{
        id: number;
        content: string;
        userId: number;
        parentId: number | null;
    }, unknown> & {})[]>;
}
