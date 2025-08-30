import Mockup from '../assets/mockup.jpg';

function MainPage() {
  return (
    <div className="w-full mx-auto pt-16 sm:pt-20 md:pt-24 lg:pt-28 xl:pt-[8.125rem] text-center px-4 sm:px-6 md:px-8 lg: px-10 xl:px-[12.375rem]">
      <header>
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[3.384rem] font-590">
          웹 개발 입문부터 실전 프로젝트까지!
          <br />
          <span className="block mt-[0.188rem]">체계적으로 성장할 수 있는 실습형 학습 플랫폼</span>
        </h1>
      </header>

      <section className="mt-11 sm:mt-12 md:mt-14 lg:mt-16 xl:mt-20">
        <div className="flex mr-3 sm:mr-3.5 md:mr-4 lg:mr-5 xl:mr-6 justify-end gap-0.5 sm:gap-1 md:gap-1.5 lg:gap-1.5 xl:gap-2 mb-1 sm:mb-1.5 md:mb-2 lg:mb-2.5 xl:mb-3">
          <div className="dot" />
          <div className="dot !bg-black" />
          <div className="dot" />
        </div>
        <div className="w-full max-w-[196px] sm:max-w-[272px] md:max-w-[346px] lg:max-w-[445px] xl:max-w-[742px] ml-auto rounded-[clamp(5px,2.7vw,20px)] overflow-hidden aspect-[742/426]">
          <img src={Mockup} alt="메인 모형 이미지" />
        </div>
      </section>

      <section className="mt-32 sm:mt-36 md:mt-40 lg:mt-48 xl:mt-[19.125rem] xl:mt-[19.125rem] font-medium text-xs sm:text-base md:text-xl lg:text-2xl xl:text-[2.031rem] text-center text-gray-600">
        <p className="mb-6 sm:mb-8 md:mb-10 lg:mb-11 xl:mb-[2.875rem] leading-[1.17]!">
          HTML, CSS, JavaScript부터 시작해
          <br />
          React, Node.js를 거쳐 실제 서비스를 기획하고 배포하는 과정까지
        </p>
        <p className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 xl:mb-[6.5rem]">
          기초 문법부터 실습 중심으로 탄탄히 쌓는 프론트엔드 개발의 첫걸음.
        </p>
        <p>
          단순한 강의 시청이 아닌, 코드를 직접 작성하고 실시간 피드백을 통해 실력을 키워나갈 수
          있습니다.
        </p>
      </section>
    </div>
  );
}

export default MainPage;
