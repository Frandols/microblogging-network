export default {
  APIURL: `${window.location.protocol}//${window.location.hostname}/api`,
  webSocketAPIURL: `wss://${window.location.hostname}/api`,
  gitHubOAuthURL: `https://github.com/login/oauth/authorize?redirect_uri=${window.location.protocol}//${window.location.hostname}?provider=github`,
  gitHubClientID: import.meta.env.VITE_GITHUB_CLIENT_ID as string,
}
