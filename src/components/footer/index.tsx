import FooterBG from '@/assets/website/footer_background.png';

export default function Footer() {
  return (
    <div id="footer" className="relative mt-12 w-full pt-4">
      <img
        className="h-[450px] w-full bg-sky-900 object-cover brightness-50 md:h-[370px]"
        src={FooterBG}
      ></img>
      <div className="absolute left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] text-sm">
        <div>
          <p className="mb-6 text-center text-3xl font-bold text-[#ffffff]">
            联系我们
          </p>
          <div className="flex flex-wrap content-start">
            <div className="mr-6 mb-3 flex items-center" />
            <p className="text-left font-serif text-lg font-thin text-[#ebebeb]">
              非常期待致力于更好的中文 AI
              搜索/问答系统的科学家、工程师、产品经理和设计师加入我们{' '}
              <a href="https://twitter.com">Incubated by @AI is Life</a>
            </p>
          </div>

          <div className="mt-1 flex w-full">
            <div className="... h-14 grow"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
