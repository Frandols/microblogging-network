import User from '../../users/models/user.model';
declare class Count {
    children: number;
}
export default class Post {
    id: number;
    content: string;
    user: User;
    updatedAt: Date;
    parent: Post;
    children: Post[];
    _count: Count;
}
export {};
