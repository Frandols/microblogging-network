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
const graphql_1 = require("@nestjs/graphql");
const posts_service_1 = require("./posts.service");
const post_model_1 = require("./models/post.model");
const create_post_input_1 = require("./dto/create-post.input");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../auth/auth.guard");
const get_post_args_1 = require("./dto/get-post.args");
let PostsResolver = class PostsResolver {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async createPost(createPostInput, req) {
        return this.postsService.create(req.token, createPostInput);
    }
    async getPosts() {
        return this.postsService.findMany();
    }
    async getPost(getPostArgs) {
        return this.postsService.findUnique(getPostArgs.id);
    }
};
__decorate([
    (0, graphql_1.Mutation)(() => post_model_1.default),
    (0, common_1.UseGuards)(auth_guard_1.default),
    __param(0, (0, graphql_1.Args)('createPostInput')),
    __param(1, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_post_input_1.default, Object]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "createPost", null);
__decorate([
    (0, graphql_1.Query)(() => [post_model_1.default]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPosts", null);
__decorate([
    (0, graphql_1.Query)(() => post_model_1.default),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_post_args_1.default]),
    __metadata("design:returntype", Promise)
], PostsResolver.prototype, "getPost", null);
PostsResolver = __decorate([
    (0, graphql_1.Resolver)('Post'),
    __metadata("design:paramtypes", [posts_service_1.default])
], PostsResolver);
exports.default = PostsResolver;
//# sourceMappingURL=posts.resolver.js.map