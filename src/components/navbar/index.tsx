import { Link } from 'react-router-dom';

const Navbar = (): JSX.Element => {
  return (
    <div className="layout fixed z-10 w-full">
      <div className="h-18 flex w-full justify-center bg-gray-900">
        <div className="m-5 grow text-start font-serif text-2xl text-white">
          <Link to="/">AI is Life</Link>
        </div>
        <div className="m-5 text-xl text-white">
          {/* <Link to="/about">About</Link> */}
        </div>
        <div
          className="m-5 text-xl text-white"
          onClick={() =>
            document
              .getElementById('footer')
              ?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          {/* <Link to="/topics">Contact</Link> */}
          <p>Contact</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
