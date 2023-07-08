import { getPost, getPosts } from '../queries'
import { DocumentNode } from '@apollo/client'
import { Params } from 'react-router-dom'

const keys: { [key: string]: (prop: string) => DocumentNode } = {
  postId: getPost,
}

const getQueryBasedOnParams = (params: Params) => {
  const paramsKeys = Object.keys(params)

  if (paramsKeys.length === 0) return getPosts()

  const key = paramsKeys[0]

  const query = keys[key]

  return query(params[key] as string)
}

export default getQueryBasedOnParams
