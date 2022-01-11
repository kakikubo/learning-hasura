/**
 * @jest-environment jsdom
 */
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { getPage, initTestHelpers } from 'next-page-tester';
import { setupServer } from 'msw/node';
import { handlers } from '../mock/handlers';
import 'setimmediate';

process.env.NEXT_PUBLIC_HASURA_URL =
  'https://kakikubo-hasura.hasura.app/v1/graphql';

initTestHelpers();

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => {
  server.close();
});

describe('Hasura Fetch Test Cases', () => {
  it('Shoud render the list of users by useQuery', async () => {
    const { page } = await getPage({
      route: '/hasura-main',
    });
    render(page);
    expect(await screen.findByText('Hasura main page')).toBeInTheDocument();
    expect(await screen.findByText('test user1')).toBeInTheDocument();
    expect(screen.getByText('test user2')).toBeInTheDocument();
    expect(screen.getByText('test user3')).toBeInTheDocument();
  });
});
