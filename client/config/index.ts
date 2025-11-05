const currentURL = `${location.protocol}//${location.hostname}${
  import.meta.env.DEV ? `:${location.port}` : ''
}`

const config = {
  APIURL: import.meta.env.VITE_API_URL,
  webSocketAPIURL: import.meta.env.VITE_WS_API_URL,
  gitHubOAuthURL: `https://github.com/login/oauth/authorize?client_id=${
    import.meta.env.VITE_GITHUB_CLIENT_ID
  }&redirect_uri=${currentURL}?provider=github`,
  googleOAuthURL: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_GOOGLE_CLIENT_ID
  }&redirect_uri=${currentURL}?provider=google&response_type=code&scope=https://www.googleapis.com/auth/userinfo.profile`,
}

export default config
