import React, { ReactNode, FC } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { LinkComponent } from './LinkComponent';

interface Props {
  children: ReactNode;
  title: string;
}

export const Layout: FC<Props> = ({
  children,
  title = 'Welcome to Nextjs',
}) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-gray-600 text-sm font-mono">
      <Head>
        <title>{title}</title>
      </Head>
      <header>
        <nav className="bg-gray-800 w-screen">
          <div className="flex item-center pl-8 h-14">
            <div className="flex space-x-4">
              <LinkComponent href="/">
                <span
                  data-testid="home-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  Home
                </span>
              </LinkComponent>
              <LinkComponent href="/local-state-a">
                <span
                  data-testid="makevar-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  makeVar
                </span>
              </LinkComponent>
              <LinkComponent href="/hasura-main">
                <span
                  data-testid="fetchpolicy-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  fetchPolicy(Hasura)
                </span>
              </LinkComponent>
              <LinkComponent href="/hasura-crud">
                <span
                  data-testid="crud-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  CRUD(Hasura)
                </span>
              </LinkComponent>
              <LinkComponent href="/hasura-ssg">
                <span
                  data-testid="ssg-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  SSG+ISR(Hasura)
                </span>
              </LinkComponent>
              <LinkComponent href="/hooks-memo">
                <span
                  data-testid="memo-nav"
                  className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded"
                >
                  custom hook + memo
                </span>
              </LinkComponent>
            </div>
          </div>
        </nav>
      </header>
      <main className="flex flex-1 flex-col justify-center items-center w-screen">
        {children}
      </main>
      <footer className="w-full h-12 flex justify-center border-t">
        <a
          className="flex items-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Power by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  );
};
