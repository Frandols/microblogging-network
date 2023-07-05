import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UserContextProvider } from './contexts'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { BrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/index.ts'

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ApolloProvider client={client}>
    <UserContextProvider>
      <AppLayout>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppLayout>
    </UserContextProvider>
  </ApolloProvider>
)
