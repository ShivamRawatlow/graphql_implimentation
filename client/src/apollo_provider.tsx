import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';
import React from 'react';
import App from './App';

const baseUrl = process.env.REACT_APP_BaseUrl;
const httpLink = createHttpLink({
  uri: baseUrl,
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

//@ts-ignore
const finalLink: ApolloLink = authLink.concat(httpLink);

const client = new ApolloClient({
  link: finalLink,
  cache: new InMemoryCache(),
});

const MyApolloProvider = () => {
  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
};

export default MyApolloProvider;
