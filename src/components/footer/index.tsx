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
          <p className="mb-6 text-center font-mono text-3xl font-bold text-[#e6e6e6]">
            联系我们
          </p>
          <div className="flex flex-wrap content-start">
            <div className="mr-6 mb-3 flex items-center" />
            <p className="text-left font-mono text-lg font-thin text-[#ebebeb]">
              非常期待致力于更好的中文 AI
              搜索/问答系统的科学家、工程师、产品经理和设计师加入我们{' '}
              <a href="mailto:aboutmydreams@163.com">Incubated by @DSearch</a>
            </p>
          </div>

          <div className="mt-4 flex w-full">
            <a
              href="https://beian.miit.gov.cn/"
              className="font-mono text-sm text-gray-300 transition-colors duration-200 hover:text-gray-100"
            >
              © 2020-2023 AhaClub.net 沪ICP备2020029688号-1
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
