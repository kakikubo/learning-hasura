/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { handlers } from '../mock/handlers';
import 'setimmediate';
import Home from '../pages/index';

// Jestに必要なモックをセットアップします
jest.mock('next/link', () => {
  return ({ children }) => {
    return children;
  };
});
jest.mock('next/router', () => ({
  useRouter() {
    return {
      push: jest.fn(), // push関数のモック
    };
  },
}));

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

describe('Navigation Test Cases', () => {
  it('Should route to selected page in navbar', async () => {
    render(<Home />);

    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('makevar-nav'));
    expect(await screen.findByText('makeVar')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('fetchpolicy-nav'));
    console.log(screen.debug()); // クリック後のページ内容をログに出力
    expect(await screen.findByText('fetchPolicy(Hasura)')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('crud-nav'));
    expect(await screen.findByText('CRUD(Hasura)')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('ssg-nav'));
    expect(await screen.findByText('SSG+ISR(Hasura)')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('memo-nav'));
    expect(
      await screen.findByText('custom hook + memo')
    ).toBeInTheDocument();
    userEvent.click(screen.getByTestId('home-nav'));
    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument();
  });
});
