import {
  ErrorIndicator,
  Header,
  LoadingIndicator,
  PostItem,
} from '@/components'
import { Post } from '@/entities'
import { gql, useQuery } from '@apollo/client'
import { type FC } from 'react'
import { useParams } from 'react-router-dom'
import styles from './trends.page.module.css'

const GET_POSTS_BY_TREND = gql`
  query PostsByTrend($tag: String!) {
    postsByTrend(tag: $tag) {
      id
      content
      updatedAt
      user {
        id
        name
        avatar
      }
      likedByMe
      _count {
        children
        likes
      }
    }
  }
`

const TrendsPage: FC = () => {
  const { tag } = useParams<{ tag: string }>()
  const { data, loading, error } = useQuery(GET_POSTS_BY_TREND, {
    variables: { tag: `#${tag}` },
    skip: !tag,
  })

  return (
    <>
      <Header title={`#${tag}`} showGoBackButton />
      <section className={styles.trendsPage}>
        {loading ? (
          <LoadingIndicator />
        ) : error ? (
          <ErrorIndicator />
        ) : data?.postsByTrend?.length === 0 ? (
          <section className={styles.noPostsIndicator}>
            <h1 className={styles.title}>No posts found</h1>
            <p className={styles.subtitle}>Be the first to post about #{tag}</p>
          </section>
        ) : (
          data?.postsByTrend?.map((post: Post) => (
            <PostItem key={post.id} {...post} />
          ))
        )}
      </section>
    </>
  )
}

export default TrendsPage
