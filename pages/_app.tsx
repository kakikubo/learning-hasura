import React from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client/react';
import { initializeApollo } from '../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  const client = initializeApollo();
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
