import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import 'cross-fetch/polyfill';

// export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;
const createApolloClient = () => {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', //  ブラウザじゃない場合
    link: new HttpLink({
      uri: process.env.NEXT_PUBLIC_HASURA_URL,
      headers: {
        'x-hasura-admin-secret': process.env.NEXT_PUBLIC_HASURA_KEY,
      },
    }),
    cache: new InMemoryCache(),
  });
};
export const initializeApollo = (initialState = null) => {
  const _apolloClient = apolloClient ?? createApolloClient();
  // SSGやSSRの場合は「常に」新しくApollo Clientを作成する
  if (typeof window === 'undefined') return _apolloClient;
  // クライアントの場合は「一度だけ」Apollo Clientを作成する
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};
