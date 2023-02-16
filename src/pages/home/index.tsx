import Footer from '@/components/footer';
import HomeBanner from './banner';
import EdgeWidget from './edge';

const Home = (): JSX.Element => {
  return (
    <div className="w-full items-center justify-center">
      <HomeBanner />
      <EdgeWidget />
      <Footer />
    </div>
  );
};

export default Home;
