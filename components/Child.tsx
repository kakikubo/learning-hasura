import React, { FormEvent, memo, FC } from 'react';

interface Props {
  printMsg: () => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}
// eslint-disable-next-line react/display-name
export const Child: FC<Props> = memo(({ printMsg }) => {
  return (
    <>
      {console.log('Child rendered')}
      <p>Child Component</p>
      <button
        className="my-3 py-1 px-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl focus:outline-none"
        onClick={printMsg}
      >
        click
      </button>
    </>
  );
});
