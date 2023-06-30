"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let TokensService = class TokensService {
    async getToken(code) {
        const response = await axios_1.default.post('https://github.com/login/oauth/access_token', {}, {
            params: {
                client_id: '55e0abec4b1c2e6cbb1a',
                client_secret: 'd4571fa3547a2e3922f65a89bb26bb65e16f5140',
                code,
            },
            headers: { Accept: 'application/json' },
        });
        if (!response.data.access_token)
            throw new Error('Invalid code');
        return response.data.access_token;
    }
};
TokensService = __decorate([
    (0, common_1.Injectable)()
], TokensService);
exports.default = TokensService;
//# sourceMappingURL=tokens.service.js.map