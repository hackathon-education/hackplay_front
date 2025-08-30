function TeamProjectPage() {
  // 임시 진도 데이터 (나중에 상태 기반으로 확장 가능)
  const completedUnits = 2;
  const totalUnits = 5;
  const progress = (completedUnits / totalUnits) * 100;

  return (
    <div className="max-w-[1000px] mx-auto p-8 bg-white font-sans">
      {/* 헤더 */}
      <div className="flex justify-between gap-8 pb-8 border-b border-gray-300">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">실전 Team Project 해보기</h1>
          <p className="text-gray-600 mb-2">
            프론트엔드 개발 실습을 위한 실전 프로젝트입니다. HTML/CSS/React를 활용한 간단한 MVP 개발
            과정을 체험합니다.
          </p>
          <div className="inline-block bg-[#3498db] text-white text-sm rounded px-3 py-1 mr-2">
            Easy
          </div>
          <div className="inline-block bg-[#3498db] text-white text-sm rounded px-3 py-1 mr-2">
            React
          </div>
          <div className="inline-block bg-[#3498db] text-white text-sm rounded px-3 py-1">MVP</div>
        </div>

        <div className="p-5 rounded-lg text-sm leading-relaxed min-w-[220px]">
          <div>총 학습 시간: 약 2시간</div>
          <div>강의 수: 6개</div>
          <div>퀴즈: 3개</div>
          <div className="mt-3">
            <label className="block text-sm">진도율</label>
            <div className="bg-gray-300 rounded h-2 overflow-hidden my-1">
              <div
                className="bg-[#2ecc71] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-sm">{Math.round(progress)}%</span>
          </div>
          <button className="mt-4 bg-[#2ecc71] text-white font-bold px-4 py-2 rounded cursor-pointer hover:bg-green-600 transition">
            지금 시작하기
          </button>
        </div>
      </div>

      {/* 학습 목표 */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">학습 목표</h2>
        <ul className="list-disc pl-6 space-y-1 leading-relaxed">
          <li>HTML/CSS 기반의 레이아웃 구성</li>
          <li>컴포넌트 기반 React 구조 이해</li>
          <li>간단한 SPA 라우팅 구현</li>
        </ul>
      </div>

      {/* Unit 구성 */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-3">Unit 구성</h2>
        <ol className="list-decimal pl-6 space-y-3 leading-relaxed">
          <li className="flex gap-4 items-center py-2 border-b border-gray-200">
            <img
              src="https://placehold.co/100x60?text=🔒"
              alt="locked"
              className="w-[100px] h-[60px] rounded object-cover"
            />
            <div>
              <strong>1. 프로젝트 개요 및 개발환경 구축</strong>
              <p className="text-sm">Vite + React 개발환경 설정, 구조 설명</p>
            </div>
          </li>
          <li className="flex gap-4 items-center py-2 border-b border-gray-200">
            <img
              src="https://placehold.co/100x60?text=🔒"
              alt="locked"
              className="w-[100px] h-[60px] rounded object-cover"
            />
            <div>
              <strong>2. 기본 컴포넌트 만들기</strong>
              <p className="text-sm">Header, Footer, Card 컴포넌트 구성</p>
            </div>
          </li>
          <li className="flex gap-4 items-center py-2 border-b border-gray-200">
            <img
              src="https://placehold.co/100x60?text=🔒"
              alt="locked"
              className="w-[100px] h-[60px] rounded object-cover"
            />
            <div>
              <strong>3. React Router로 페이지 연결</strong>
              <p className="text-sm">페이지 이동 구조 구현 및 테스트</p>
            </div>
          </li>
          <li className="flex gap-4 items-center py-2 border-b border-gray-200 opacity-50 italic">
            <img
              src="https://placehold.co/100x60?text=🔒"
              alt="locked"
              className="w-[100px] h-[60px] rounded object-cover"
            />
            <div>
              <strong>4. 상태관리 적용 (추후 공개 🔒)</strong>
            </div>
          </li>
          <li className="flex gap-4 items-center py-2 border-b border-gray-200 opacity-50 italic">
            <img
              src="https://placehold.co/100x60?text=🔒"
              alt="locked"
              className="w-[100px] h-[60px] rounded object-cover"
            />
            <div>
              <strong>5. 프로젝트 최종 완성 (추후 공개 🔒)</strong>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

export default TeamProjectPage;
