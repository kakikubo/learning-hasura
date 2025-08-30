import React, { FC } from 'react';
import { useQuery } from "@apollo/client/react";
import { GET_USERS } from '../queries/queries';
import { GetUsersQuery, Users_Constraint } from '../types/generated/graphql';
import { Layout } from '@/components/Layout';
import { LinkComponent } from '@/components/LinkComponent';

const FetchMain: FC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    // fetchPolicy: 'network-only',
    fetchPolicy: 'cache-and-network',
    // fetchPolicy: 'cache-first', // default
    // fetchPolicy: 'no-cache',
  });

  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    );

  return (
    <Layout title="Hasura fetchPolicy">
      <p className="mb-6 font-bold">Hasura main page</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        );
      })}
      <LinkComponent href="/hasura-sub">
        <span className="mt-6">Next</span>
      </LinkComponent>
    </Layout>
  );
};

export default FetchMain;
