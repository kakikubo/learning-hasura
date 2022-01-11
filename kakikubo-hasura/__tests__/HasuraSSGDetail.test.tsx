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

describe('UserDetail Test Cases', () => {
  it('Shoud render the user detail pre-fetched by getStaticProps', async () => {
    const { page } = await getPage({
      route: '/users/9f5d5799-fc4f-4472-a2a3-0d4bedce6e70',
    });
    render(page);
    expect(await screen.findByText('User Detail')).toBeInTheDocument();
    expect(screen.getByText('test user1')).toBeInTheDocument();
    expect(
      screen.getByText('2021-01-24T21:58:35.54389+00:00')
    ).toBeInTheDocument();
    userEvent.click(screen.getByTestId('back-to-main'));
    expect(await screen.findByText('SSG+ISR')).toBeInTheDocument();
    userEvent.click(
      screen.getByTestId('link-c06d9066-d2bc-4502-9e79-380f801ec74d')
    );
    expect(await screen.findByText('User Detail')).toBeInTheDocument();
    expect(screen.getByText('test user2')).toBeInTheDocument();
    expect(
      screen.getByText('2021-02-24T21:58:43.443901+00:00')
    ).toBeInTheDocument();
  });
});
