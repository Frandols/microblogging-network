import { gql } from '@apollo/client'

const getPosts = (parentId: string | null) => gql`
query GetPosts {
  getPosts(parentId: ${parentId}) {
    parent {
      id
      content
      user {
        id
        name
      }
      parent {
        id
      }
    }
    children {
      id
      content
      user {
        id
        name
      }
    }
  }
}
`

export { getPosts }
