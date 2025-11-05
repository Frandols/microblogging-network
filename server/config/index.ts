import { config } from 'dotenv'
config()

export default {
  port: Number(process.env.PORT) || 3000,
  gitHubClientID: String(process.env.GITHUB_CLIENT_ID),
  gitHubClientSecret: String(process.env.GITHUB_CLIENT_SECRET),
  googleClientID: String(process.env.GOOGLE_CLIENT_ID),
  googleClientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
  jwtSecret: String(process.env.JWT_SECRET)
}
