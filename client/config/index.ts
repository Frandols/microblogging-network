export default {
  APIURL: `http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}`,
  webSocketAPIURL: `ws://${import.meta.env.VITE_HOST}:${
    import.meta.env.VITE_PORT
  }`,
  gitHubOAuthURL: `https://github.com/login/oauth/authorize?redirect_uri=http://${
    import.meta.env.VITE_HOST
  }:${import.meta.env.VITE_PORT}?provider=github`,
  gitHubClientID: import.meta.env.VITE_GITHUB_CLIENT_ID as string,
}
