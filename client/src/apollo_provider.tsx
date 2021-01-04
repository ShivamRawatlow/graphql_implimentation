import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import React from 'react';
import App from './App';

const baseUrl = process.env.REACT_APP_BaseUrl;
const httpLink = createHttpLink({
  uri: baseUrl,
});

const client = new ApolloClient({ link: httpLink, cache: new InMemoryCache() });

const MyApolloProvider = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default MyApolloProvider;
