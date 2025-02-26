/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { handlers } from '../mock/handlers';
import 'setimmediate';
import HasuraSSG from '../pages/hasura-ssg';

process.env.NEXT_PUBLIC_HASURA_URL = 'https://xxx.hasura.app/v1/graphql';

// MSW の設定
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

describe('SSG Test Cases', () => {
  it('Shoud render the list of users pre-fetched by getStaticProps', async () => {
    const users = [
      {
        __typename: 'users' as const,
        id: '1',
        name: 'test user1',
        created_at: '2021-01-24T21:58:35.54389+00:00',
      },
      {
        __typename: 'users' as const,
        id: '2',
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
    // モックされたgetStaticPropsの結果を使ってComponentをレンダー
    render(<HasuraSSG users={users} />);
    expect(await screen.findByText('SSG+ISR')).toBeInTheDocument();
    expect(await screen.findByText('test user1')).toBeInTheDocument();
    expect(await screen.findByText('test user2')).toBeInTheDocument();
    expect(await screen.findByText('test user3')).toBeInTheDocument();
    // expect(
    //   screen.getByText('2021-01-24T21:58:35.54389+00:00')
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByTestId('edit-9f5d5799-fc4f-4472-a2a3-0d4bedce6e70')
    // ).toBeTruthy();
    // expect(
    //   screen.getByTestId('delete-9f5d5799-fc4f-4472-a2a3-0d4bedce6e70')
    // ).toBeTruthy();
    // expect(await screen.findByText('test user2')).toBeInTheDocument();
    // expect(
    //   screen.getByText('2021-02-24T21:58:43.443901+00:00')
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByTestId('edit-c06d9066-d2bc-4502-9e79-380f801ec74d')
    // ).toBeTruthy();
    // expect(
    //   screen.getByTestId('delete-c06d9066-d2bc-4502-9e79-380f801ec74d')
    // ).toBeTruthy();
    // expect(await screen.findByText('test user3')).toBeInTheDocument();
    // expect(
    //   screen.getByText('2021-03-24T21:59:20.423826+00:00')
    // ).toBeInTheDocument();
    // expect(
    //   screen.getByTestId('edit-ec1a5512-9f49-442c-9bc3-bbe5de91dbb9')
    // ).toBeTruthy();
    // expect(
    //   screen.getByTestId('delete-ec1a5512-9f49-442c-9bc3-bbe5de91dbb9')
    // ).toBeTruthy();
    // // expect(screen.getByText('test user2')).toBeInTheDocument();
    // // expect(screen.getByText('test user3')).toBeInTheDocument();
  });
});
