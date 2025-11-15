/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from '../mock/handlers';
import 'setimmediate';
import HasuraMain from '../pages/hasura-main';

import { GET_USERS } from '../queries/queries';

// まず、モックでApollo Clientを作成するために必要なパッケージをインポートします
import { MockedProvider } from '@apollo/client/testing/react';

process.env.NEXT_PUBLIC_HASURA_URL =
  'https://kakikubo-hasura.hasura.app/v1/graphql';

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
});
afterAll(() => {
  server.close();
});

describe('Hasura Fetch Test Cases', () => {
  it('Shoud render the list of users by useQuery', async () => {
    const users = [
      {
        __typename: 'users' as const,
        id: '9f5d5799-fc4f-4472-a2a3-0d4bedce6e70',
        name: 'test user1',
        created_at: '2021-01-24T21:58:35.54389+00:00',
      },
      {
        __typename: 'users' as const,
        id: 'c06d9066-d2bc-4502-9e79-380f801ec74d',
        name: 'test user2',
        created_at: '2021-02-24T21:58:43.443901+00:00',
      },
      {
        __typename: 'users' as const,
        id: '3',
        name: 'test user3',
        created_at: '2021-03-24T21:59:20.423826+00:00',
      },
    ];
    // モックのレスポンスやエラーを定義します（必要に応じて）
    const mocks = [
      // 例えば以下のように
      {
        request: {
          query: GET_USERS,
          // variables: {}, // もし変数を使うクエリならここで指定
        },
        result: {
          data: {
            users,
          },
        },
      },
    ];
    // MockedProviderを使用してHasuraMainコンポーネントをラップ
    render(
      <MockedProvider mocks={mocks}>
        <HasuraMain />
      </MockedProvider>
    );

    expect(await screen.findByText('Hasura main page')).toBeInTheDocument();
    expect(await screen.findByText('test user1')).toBeInTheDocument();
    expect(screen.getByText('test user2')).toBeInTheDocument();
    expect(screen.getByText('test user3')).toBeInTheDocument();
  });
});
