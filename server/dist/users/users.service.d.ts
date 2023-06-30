import PrismaService from 'src/prisma/prisma.service';
type GitHubAPIUserResponse = {
    id: number;
    login: string;
    avatar_url: string;
};
export default class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getGitHubAPIUser(token: string): Promise<GitHubAPIUserResponse>;
    upsert(token: string): Promise<import("@prisma/client/runtime").GetResult<{
        id: number;
        name: string;
        avatar: string;
    }, unknown> & {}>;
}
export {};
