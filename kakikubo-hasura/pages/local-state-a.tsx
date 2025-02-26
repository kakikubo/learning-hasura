import { FC } from 'react';
import { LocalStateA } from '../components/LocalStateA';
import { Layout } from '../components/Layout';

const LocalStatePageA: FC = () => {
  return (
    <Layout title="Local State A">
      <LocalStateA />
    </Layout>
  );
};
export default LocalStatePageA;
