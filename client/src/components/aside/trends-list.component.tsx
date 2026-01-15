import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import styles from './aside.component.module.css'

interface Trend {
  tag: string
  count: number
}

const GET_TRENDS = gql`
  query GetTrends {
    trends {
      tag
      count
    }
  }
`

const TrendsList = () => {
  const { data, loading, error } = useQuery(GET_TRENDS)

  if (loading || error || !data?.trends?.length) return null

  return (
    <div className={styles.trendsContainer}>
      <h3>Trends</h3>
      <ul className={styles.trendsList}>
        {data.trends.map((trend: Trend) => (
          <li key={trend.tag}>
            <Link to={`/trends/${trend.tag.replace('#', '')}`}>
              <span className={styles.trendTag}>{trend.tag}</span>
              <span className={styles.trendCount}>{trend.count} posts</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TrendsList
