/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import '@testing-library/jest-dom';
// import userEvent from "@testing-library/user-event";
import { setupServer } from 'msw/node';
import { handlers } from '../mock/handlers';
import 'setimmediate';
import Home from '../pages/index';

// Jestに必要なモックをセットアップします
// jest.mock('next/router', () => ({
//   useRouter() {
//     return {
//       route: '/',
//       pathname: '',
//       query: '',
//       asPath: '',
//       push: jest.fn(), // 画面遷移をシミュレートするためのモック関数
//     };
//   },
// }));
jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
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
  it('ナビゲーションリンクが正しいtest idで表示されること', async () => {
    render(<Home />);

    // ホームページのコンテンツが表示されていることを確認(test2)
    expect(await screen.findByText('Next.js + GraphQL')).toBeInTheDocument();

    // ナビゲーションリンクが存在することを確認
    expect(screen.getByTestId('home-nav')).toBeInTheDocument();
    expect(screen.getByTestId('makevar-nav')).toBeInTheDocument();
    expect(screen.getByTestId('fetchpolicy-nav')).toBeInTheDocument();
    expect(screen.getByTestId('crud-nav')).toBeInTheDocument();
    expect(screen.getByTestId('ssg-nav')).toBeInTheDocument();
    expect(screen.getByTestId('memo-nav')).toBeInTheDocument();

    // ナビゲーションリンクのテキストが正しいことを確認
    expect(screen.getByTestId('home-nav')).toHaveTextContent('Home');
    expect(screen.getByTestId('makevar-nav')).toHaveTextContent('makeVar');
    expect(screen.getByTestId('fetchpolicy-nav')).toHaveTextContent(
      'fetchPolicy(Hasura)'
    );
    expect(screen.getByTestId('crud-nav')).toHaveTextContent('CRUD(Hasura)');
    expect(screen.getByTestId('ssg-nav')).toHaveTextContent('SSG+ISR(Hasura)');
    expect(screen.getByTestId('memo-nav')).toHaveTextContent(
      'custom hook + memo'
    );
  });
});
