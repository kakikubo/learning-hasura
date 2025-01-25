import { FC } from 'react';
import { Layout } from '../components/Layout';
import { CreateUser } from '../components/CreateUser';

const HooksMemo: FC = () => {
  return (
    <Layout title="Hooks memo">
      <CreateUser />
    </Layout>
  );
};
export default HooksMemo;
