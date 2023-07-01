import { gql } from '@apollo/client'

const getPosts = gql`
  query GetPosts {
    getPosts(parentId: null) {
      parent {
        user {
          id
          name
        }
        content
        parent {
          id
        }
      }
      children {
        user {
          id
          name
        }
        content
      }
    }
  }
`

export { getPosts }
