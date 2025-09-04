import React, { FC } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client/react';
import { GET_USERS_LOCAL } from '../queries/queries';
import { GetUsersQuery } from '../types/generated/graphql';
import { Layout } from '@/components/Layout';

const FetchSub: FC = () => {
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS_LOCAL);

  if (error)
    return (
      <Layout title="Hasura fetchPolicy">
        <p>Error: {error.message}</p>
      </Layout>
    );

  return (
    <Layout title="Hasura fetchPolicy read cache">
      <p className="mb-6 font-bold">Direct read out from cache</p>
      {data?.users.map((user) => {
        return (
          <p className="my-1" key={user.id}>
            {user.name}
          </p>
        );
      })}
      <Link href="/hasura-main">
        <a className="mt-6">Back</a>
      </Link>
    </Layout>
  );
};

export default FetchSub;
