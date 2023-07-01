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
    upsert(token: string): Promise<void>;
}
export {};
