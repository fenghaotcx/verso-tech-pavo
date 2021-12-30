import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

let apolloClient;
const authToken = '';

const httpLink = createHttpLink({
  uri: 'https://graph.contco.dev/',
  fetch,
});

const authLink = setContext((_,{ headers }) => {
  return {
    headers: {
      ...headers,
      'DG-Auth': authToken,
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    // ssrMode: typeof window === 'undefined',
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState) {
  const newApolloClient = apolloClient ?? createApolloClient();
  if (initialState) {
    newApolloClient.cache.restore(initialState);
  }
  if (typeof window === 'undefined') return newApolloClient;
  if (!apolloClient) apolloClient = newApolloClient;

  return newApolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
