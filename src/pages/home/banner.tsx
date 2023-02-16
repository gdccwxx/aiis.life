import Bg from '@/assets/website/cool_background.svg';
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
        <div className="mt-80 text-center text-6xl font-bold text-white">
          <img
            className="mx-auto w-full "
            draggable="false"
            src="https://readme-typing-svg.herokuapp.com?font=Secular+One&size=60&duration=1300&pause=149700&color=FFFFFF&center=%E7%9C%9F%E7%9A%84&vCenter=%E7%9C%9F%E7%9A%84&width=300&height=85&lines=AI.+IS.+LIFE"
            alt="Typing SVG"
          />
        </div>
        <div className="mx-0 mb-80 text-center font-serif text-2xl font-thin text-[#c8c8c8] md:mx-auto">
          AI Life is using AI finish the work which is so boring.
        </div>
      </div>
    </div>
  );
}
