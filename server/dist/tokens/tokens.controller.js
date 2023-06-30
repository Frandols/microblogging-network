"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const tokens_service_1 = require("./tokens.service");
const users_service_1 = require("../users/users.service");
let TokensController = class TokensController {
    constructor(tokensService, usersService) {
        this.tokensService = tokensService;
        this.usersService = usersService;
    }
    async getToken(code) {
        const token = await this.tokensService.getToken(code);
        this.usersService.upsert(token);
        return token;
    }
};
__decorate([
    (0, common_1.Get)(':code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TokensController.prototype, "getToken", null);
TokensController = __decorate([
    (0, common_1.Controller)('tokens'),
    __metadata("design:paramtypes", [tokens_service_1.default,
        users_service_1.default])
], TokensController);
exports.default = TokensController;
//# sourceMappingURL=tokens.controller.js.map