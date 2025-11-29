import { useState, useCallback, ChangeEvent, FormEvent } from 'react';
import { useMutation } from '@apollo/client/react';
import { CREATE_USER } from '../queries/queries';
import { CreateUserMutation } from '../types/generated/graphql';

export const useCreateForm = () => {
  const [text, setText] = useState('');
  const [username, setUsername] = useState('');
  const [insert_users_one] = useMutation<CreateUserMutation>(CREATE_USER, {
    update(cache, { data }) {
      if (data?.insert_users_one) {
        const cacheId = cache.identify(data.insert_users_one);
        cache.modify({
          fields: {
            users(existingUsers, { toReference }) {
              return cacheId
                ? [toReference(cacheId), ...existingUsers]
                : existingUsers;
            },
          },
        });
      }
    },
  });
  const handleTextChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);
  const usernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);
  const printMsg = useCallback(() => {
    console.log('Hello');
  }, []);
  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await insert_users_one({
          variables: {
            name: username,
          },
        });
      } catch (err) {
        alert(err instanceof Error ? err.message : 'An error occurred');
      }
      setUsername('');
    },
    [username, insert_users_one]
  );
  return {
    text,
    handleSubmit,
    username,
    usernameChange,
    printMsg,
    handleTextChange,
  };
};
