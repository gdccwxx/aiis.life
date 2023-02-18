import Bg from '@/assets/website/cool_background.svg';
import SearchInput from './searchInput';
// 打字动效
// https://readme-typing-svg.herokuapp.com/demo/

export default function HomeBanner() {
  return (
    <div
      className="relative h-[700px] w-full"
      style={{
        backgroundImage: `url(${Bg})`,
        backgroundPosition: 'center 100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute top-1/3 left-1/2 w-full translate-x-[-50%] translate-y-[-50%] px-20 text-sm md:px-80">
        <div className="h-80"></div>
        <div className="mt-[16rem] text-center text-6xl font-bold text-white">
          <img
            className="mx-auto w-full "
            draggable="false"
            src="https://readme-typing-svg.herokuapp.com?font=Secular+One&size=60&duration=1300&pause=149700&color=FFFFFF&center=%E7%9C%9F%E7%9A%84&vCenter=%E7%9C%9F%E7%9A%84&width=300&height=85&lines=AI.+IS.+LIFE"
            alt="Typing SVG"
          />
        </div>
        <div className="flex w-full items-center justify-center">
          <input
            type="text"
            placeholder="Search here"
            className="w-full rounded-l-md bg-gray-800 py-2 px-4 text-white outline-none"
          />
          <button
            className="rounded-r-md bg-blue-600 py-2 px-4"
            onClick={() => window.location.replace('/search')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mx-0 mt-10 mb-80 text-center font-serif text-lg font-thin text-[#c8c8c8] md:mx-auto">
          AI Life is using AI finish the work which is so boring.
        </div>
      </div>
    </div>
  );
}
