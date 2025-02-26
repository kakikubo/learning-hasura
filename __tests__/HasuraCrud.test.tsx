/**
 * @jest-environment jsdom
 */
import React, { act } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from '../mock/handlers';
import 'setimmediate';
import HasuraCRUD from '../pages/hasura-crud';
import { MockedProvider } from '@apollo/client/testing';
import { GET_USERS } from '../queries/queries';
// import { act } from 'react-dom/test-utils';

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

describe('Hasura CRUD Test Cases', () => {
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
        id: 'ec1a5512-9f49-442c-9bc3-bbe5de91dbb9',
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

    await act(async () => {
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <HasuraCRUD />
        </MockedProvider>
      );
    });
    expect(await screen.findByText('Hasura CRUD')).toBeInTheDocument();
    expect(await screen.findByText('test user1')).toBeInTheDocument();
    expect(
      screen.getByText('2021-01-24T21:58:35.54389+00:00')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('edit-9f5d5799-fc4f-4472-a2a3-0d4bedce6e70')
    ).toBeTruthy();
    expect(
      screen.getByTestId('delete-9f5d5799-fc4f-4472-a2a3-0d4bedce6e70')
    ).toBeTruthy();
    expect(await screen.findByText('test user2')).toBeInTheDocument();
    expect(
      screen.getByText('2021-02-24T21:58:43.443901+00:00')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('edit-c06d9066-d2bc-4502-9e79-380f801ec74d')
    ).toBeTruthy();
    expect(
      screen.getByTestId('delete-c06d9066-d2bc-4502-9e79-380f801ec74d')
    ).toBeTruthy();
    expect(await screen.findByText('test user3')).toBeInTheDocument();
    expect(
      screen.getByText('2021-03-24T21:59:20.423826+00:00')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('edit-ec1a5512-9f49-442c-9bc3-bbe5de91dbb9')
    ).toBeTruthy();
    expect(
      screen.getByTestId('delete-ec1a5512-9f49-442c-9bc3-bbe5de91dbb9')
    ).toBeTruthy();
    // expect(screen.getByText('test user2')).toBeInTheDocument();
    // expect(screen.getByText('test user3')).toBeInTheDocument();
  });
});
