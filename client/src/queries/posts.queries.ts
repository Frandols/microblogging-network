import { gql } from '@apollo/client'

const getPosts = (parentId: string | null) => gql`
query GetPosts {
  getPosts(parentId: ${parentId}) {
    id
    content
    updatedAt
    user {
      id
      name
    }
    _count {
      children
    }
 }
}
`

export { getPosts }
