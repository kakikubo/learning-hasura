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

describe('Hasura CRUD Test Cases', () => {
  it('Shoud render the list of users by useQuery', async () => {
    const { page } = await getPage({
      route: '/hasura-crud',
    });
    render(page);
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
