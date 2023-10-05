import { config } from 'dotenv'
config()

export default {
  port: process.env.PORT || '3000',
  gitHubClientID: process.env.GITHUB_CLIENT_ID,
  gitHubClientSecret: process.env.GITHUB_CLIENT_SECRET,
  jwtSecret: process.env.JWT_SECRET,
}
