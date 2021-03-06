import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {
  ApolloClient, ApolloProvider, HttpLink, InMemoryCache
} from '@apollo/client'
import { setContext } from 'apollo-link-context'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user')

  // console.log('token', token)
  // console.log('_', _)
  // console.log('headers', headers)

  return {
    headers: {
      ...headers,
      authorization: token ? `bearer ${token}` : null,
    }
  }
})

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
  // link: new HttpLink({
  //   uri: 'http://localhost:4000',
  // })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)