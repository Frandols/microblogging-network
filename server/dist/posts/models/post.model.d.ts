import User from '../../users/models/user.model';
export default class Post {
    id: number;
    content: string;
    user: User;
    parent: Post;
    children: Post[];
}
