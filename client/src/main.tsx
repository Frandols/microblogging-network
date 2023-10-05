import { GlobalLayout } from '@/layouts'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import { WebSocketLink } from '@apollo/client/link/ws'
import { getMainDefinition } from '@apollo/client/utilities'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import config from '../config'
import App from './App.tsx'
import { Modal } from './components/index.ts'
import './index.css'

const httpEndpoint = config.APIURL + '/graphql'
const webSocketEndpoint = config.webSocketAPIURL + '/graphql'

const wsLink = new WebSocketLink(
  new SubscriptionClient(webSocketEndpoint, {
    connectionParams: {
      Authorization:
        localStorage.getItem('token') !== null
          ? `Bearer ${localStorage.getItem('token') as string}`
          : null,
    },
  })
)

const httpLink = new HttpLink({
  uri: httpEndpoint,
})

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Modal />
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: 'var(--base)',
            color: 'var(--text-color)',
            border: '1px solid var(--border-color)',
            boxShadow: 'none',
            padding: 'var(--padding)',
          },
        }}
        position='bottom-center'
      />
      <GlobalLayout>
        <App />
      </GlobalLayout>
    </BrowserRouter>
  </ApolloProvider>
)
