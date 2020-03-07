import React from 'react';
import ReactDOM from 'react-dom';
import App from './AppRoot/App';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import Notifications, { notify } from 'react-notify-toast';

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message }) => notify.show(message, 'error'));
});
const httpLink = createHttpLink({ uri: 'http://localhost:4300/graphql' });

const link = ApolloLink.from([errorLink, httpLink]);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
});

// Render the Root element into the DOM
ReactDOM.render(
  <ApolloProvider client={client}>
    <Notifications />
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
