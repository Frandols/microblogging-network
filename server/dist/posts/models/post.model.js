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
var Post_1;
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const user_model_1 = require("../../users/models/user.model");
let Count = class Count {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Count.prototype, "children", void 0);
Count = __decorate([
    (0, graphql_1.ObjectType)()
], Count);
let Post = Post_1 = class Post {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], Post.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Post.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => user_model_1.default),
    __metadata("design:type", user_model_1.default)
], Post.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Post.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Post_1, { nullable: true }),
    __metadata("design:type", Post)
], Post.prototype, "parent", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Post_1]),
    __metadata("design:type", Array)
], Post.prototype, "children", void 0);
__decorate([
    (0, graphql_1.Field)(() => Count),
    __metadata("design:type", Count)
], Post.prototype, "_count", void 0);
Post = Post_1 = __decorate([
    (0, graphql_1.ObjectType)({ description: 'post' })
], Post);
exports.default = Post;
//# sourceMappingURL=post.model.js.map