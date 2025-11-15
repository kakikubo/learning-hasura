import React, { FC, useState, FormEvent } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  GET_USERS,
  CREATE_USER,
  DELETE_USER,
  UPDATE_USER,
} from '../queries/queries';
import {
  GetUsersQuery,
  CreateUserMutation,
  DeleteUserMutation,
  UpdateUserMutation,
} from '../types/generated/graphql';
import { Layout } from '@/components/Layout';
import { UserItem } from '@/components/UserItem';

const HasuraCRUD: FC = () => {
  const [editedUser, setEditedUser] = useState({ id: '', name: '' });
  const { data, error } = useQuery<GetUsersQuery>(GET_USERS, {
    fetchPolicy: 'cache-and-network',
  });
  const [update_users_by_pk] = useMutation<UpdateUserMutation>(UPDATE_USER);
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data }) {
      if (data?.insert_users_one) {
        const cacheId = cache.identify(data.insert_users_one);
        cache.modify({
          fields: {
            users(existingUsers, { toReference }) {
              return cacheId ? [toReference(cacheId), ...existingUsers] : existingUsers;
            },
          },
        });
      }
    },
  });
  const [delete_users_by_pk] = useMutation<DeleteUserMutation>(DELETE_USER, {
    update(cache, { data }) {
      if (data?.delete_users_by_pk) {
        cache.modify({
          fields: {
            users(existingUsers, { readField }) {
              return existingUsers.filter(
                (user: any) => data.delete_users_by_pk!.id !== readField('id', user)
              );
            },
          },
        });
      }
    },
  });
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedUser.id) {
      try {
        await update_users_by_pk({
          variables: {
            id: editedUser.id,
            name: editedUser.name,
          },
        });
      } catch (err) {
        alert(err instanceof Error ? err.message : 'An error occurred');
      }
      setEditedUser({ id: '', name: '' });
    } else {
      try {
        await insert_users_one({
          variables: {
            name: editedUser.name,
          },
        });
      } catch (err) {
        alert(err instanceof Error ? err.message : 'An error occurred');
      }
      setEditedUser({ id: '', name: '' });
    }
  };
  if (error) return <Layout title="Hasura CRUD">Error: {error.message}</Layout>;
  return (
    <Layout title="Hasura CRUD">
      <p className="mb-6 font-bold">Hasura CRUD</p>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={handleSubmit}
      >
        <input
          className="px-3 py-2 border border-gray-300"
          placeholder="New User ?"
          type="text"
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
        <button
          disabled={!editedUser.name}
          className="disabled:opacity-40 my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 routed-2xl focus:outline-none"
          data-testid="new"
          type="submit"
        >
          {editedUser.id ? 'Update' : 'Create'}
        </button>
      </form>

      {data?.users.map((user: { id: any; name: string; created_at: any }) => {
        return (
          <UserItem
            key={user.id}
            user={user}
            setEditedUser={setEditedUser}
            delete_users_by_pk={delete_users_by_pk}
          />
        );
      })}
    </Layout>
  );
};

export default HasuraCRUD;
