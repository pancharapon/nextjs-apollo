import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import merge from 'deepmerge';
import Cookies from 'js-cookie';
// import cookie from 'cookie';

let apolloClient;

function createIsomorphLink() {
  const { HttpLink } = require('@apollo/client/link/http');
  const isServerRender = typeof window === 'undefined';
  const uri = isServerRender
    ? process.env.BACKEND_SERVICE_URL
    : process.env.BACKEND_URL;

  return new HttpLink({
    // uri: `${uri}/graphql`,
    uri: 'https://api.larler-dev.com/query',
    credentials: 'same-origin',
  });
}

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // let token = localStorage.getItem('token') || '';

  const token =
    'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYWQ4YjFmLWNkMzMtNDk3Zi1hNWZhLWQ5ODg0N2JiYjQ3ZCIsInR5cGUiOjIsImV4cCI6MTYyMzc1NzMyNSwiaWF0IjoxNjIzNzUzNzI1fQ.i9Tv-LY174pQXYNo7vDtovzcgDSCSK0t4PMBWZpBReLRBoXj-davfDZjwmeRv08qUMaa6b-HdbNfhsQf7E4iWoRUFq0rdWpTRZx2kU92ZwBtdPzck_7nsngL-C2-GCLG1miYBPzjos1jw7zaTDfpU8nTgtLWjQm58F-XOA5BTg8';

  // let cookies;

  // if (typeof window !== 'undefined') {
  //   cookies = cookie.parse(document.cookie || '');
  // }

  // const token = (cookies && cookies.token) || '';
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: authLink.concat(createIsomorphLink()),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // get hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache);

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
