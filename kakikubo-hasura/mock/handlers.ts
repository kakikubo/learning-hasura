import { graphql } from 'msw';
export const handlers = [
  graphql.query('GetUsers', (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {
            __typename: 'users',
            id: '9f5d5799-fc4f-4472-a2a3-0d4bedce6e70',
            name: 'test user1',
            created_at: '2021-01-24T21:58:35.54389+00:00',
          },
          {
            __typename: 'users',
            id: 'c06d9066-d2bc-4502-9e79-380f801ec74d',
            name: 'test user2',
            created_at: '2021-02-24T21:58:43.443901+00:00',
          },
          {
            __typename: 'users',
            id: 'ec1a5512-9f49-442c-9bc3-bbe5de91dbb9',
            name: 'test user3',
            created_at: '2021-03-24T21:59:20.423826+00:00',
          },
        ],
      })
    );
  }),
  graphql.query('GetUserIDS', (req, res, ctx) => {
    return res(
      ctx.data({
        users: [
          {
            __typename: 'users',
            id: '9f5d5799-fc4f-4472-a2a3-0d4bedce6e70',
          },
          {
            __typename: 'users',
            id: 'c06d9066-d2bc-4502-9e79-380f801ec74d',
          },
          {
            __typename: 'users',
            id: 'ec1a5512-9f49-442c-9bc3-bbe5de91dbb9',
          },
        ],
      })
    );
  }),
  graphql.query('GetUserById', (req, res, ctx) => {
    const { id } = req.variables;
    if (id === '9f5d5799-fc4f-4472-a2a3-0d4bedce6e70') {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: 'users',
            id: '9f5d5799-fc4f-4472-a2a3-0d4bedce6e70',
            name: 'test user1',
            created_at: '2021-01-24T21:58:35.54389+00:00',
          },
        })
      );
    }
    if (id === 'c06d9066-d2bc-4502-9e79-380f801ec74d') {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: 'users',
            id: 'c06d9066-d2bc-4502-9e79-380f801ec74d',
            name: 'test user2',
            created_at: '2021-02-24T21:58:43.443901+00:00',
          },
        })
      );
    }
    if (id === 'ec1a5512-9f49-442c-9bc3-bbe5de91dbb9') {
      return res(
        ctx.data({
          users_by_pk: {
            __typename: 'users',
            id: 'ec1a5512-9f49-442c-9bc3-bbe5de91dbb9',
            name: 'test user3',
            created_at: '2021-03-24T21:59:20.423826+00:00',
          },
        })
      );
    }
  }),
];
