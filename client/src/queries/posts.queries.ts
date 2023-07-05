import { gql } from '@apollo/client'

const getPosts = () => gql`
  query GetPosts {
    getPosts {
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

const getPost = (id: string) => gql`
{
  getPost(id: ${id}) {
    id
    content
    updatedAt
    user {
      id
      name
    }
    children {
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
}
`

export { getPosts, getPost }
