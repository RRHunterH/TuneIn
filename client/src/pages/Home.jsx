import { useQuery } from '@apollo/client';

import MainSection from '../components/MainSection';

const Home = () => {
  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <MainSection />
        </div>
      </div>
    </main>
  );
};

export default Home;
