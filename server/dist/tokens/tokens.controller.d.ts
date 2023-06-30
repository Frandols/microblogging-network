import TokensService from './tokens.service';
import UsersService from 'src/users/users.service';
export default class TokensController {
    private readonly tokensService;
    private readonly usersService;
    constructor(tokensService: TokensService, usersService: UsersService);
    getToken(code: string): Promise<any>;
}
