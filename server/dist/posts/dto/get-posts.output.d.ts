import Post from '../models/post.model';
export default class GetPostsOutput {
    parent: Post;
    children: Post[];
}
