/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import { handlers } from '../mock/handlers';
import 'setimmediate';
import HasuraSSGDetail from '../pages/users/[id]';
import React from 'react';

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
jest.mock(
  'next/link',
  () =>
    ({ children }) =>
      children
);
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(), // push関数のモック
    };
  },
}));
describe('UserDetail Test Cases', () => {
  it('Shoud render the user detail pre-fetched by getStaticProps', async () => {
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
    ];
    render(<HasuraSSGDetail user={users[0]} />);

    expect(await screen.findByText('User Detail')).toBeInTheDocument();
    expect(screen.getByText('test user1')).toBeInTheDocument();
    expect(
      screen.getByText('2021-01-24T21:58:35.54389+00:00')
    ).toBeInTheDocument();
    userEvent.click(screen.getByTestId('back-to-main'));
    // expect(await screen.findByText('SSG+ISR')).toBeInTheDocument();
    // userEvent.click(
    //   screen.getByTestId('link-c06d9066-d2bc-4502-9e79-380f801ec74d')
    // );
    // expect(await screen.findByText('User Detail')).toBeInTheDocument();
    // expect(screen.getByText('test user2')).toBeInTheDocument();
    // expect(
    //   screen.getByText('2021-02-24T21:58:43.443901+00:00')
    // ).toBeInTheDocument();
  });
});
