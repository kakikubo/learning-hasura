import * as React from 'react';
import '../styles/globals.css';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client/react';
import { initializeApollo } from '../lib/apolloClient';

function MyApp({ Component, pageProps }: AppProps) {
  const client = initializeApollo();
  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default MyApp;
