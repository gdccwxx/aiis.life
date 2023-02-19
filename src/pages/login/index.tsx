import { LoginModal } from '@/components/loginModal';

const Home = (): JSX.Element => {
  return (
    <div className="home h-screen bg-slate-200 font-sans tracking-wider">
      <div className="flex items-center">
        <LoginModal defaultOpen={true} />
      </div>
    </div>
  );
};

export default Home;
