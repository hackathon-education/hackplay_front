import { useState } from 'react';
import { AiFillFileText } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { BsPencilFill } from 'react-icons/bs';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

import BEDeveloperImg from '@/assets/backend.png';
import DesignerImg from '@/assets/designer.png';
import FEDeveloperImg from '@/assets/frontend.png';
import PlannerImg from '@/assets/planner.png';
import { JOB_TYPES } from '@/constants/jobTypes';

// 좌측 패널 - 탭 아이템 인터페이스
interface tabItem {
  key: 'overview' | 'request' | 'answer';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  sizeClass?: string;
}

// 좌측 패널 - 실습 개요(첫 번째 탭) 아이템 인터페이스
interface overviewItem {
  title: string;
  content: string;
}

// 좌측 패널 - 직무별 요청사항(두 번째 탭) 인터페이스
interface request {
  role: string;
  image: string;
  content: string;
}

const CodeEditorPage = () => {
  const userRole = JOB_TYPES.FE; // 사용자 직무
  const [activeTab, setActiveTab] = useState<'overview' | 'request' | 'answer'>('overview');
  const [currentRequestIndex, setCurrentRequestIndex] = useState<number>(0); // 직무별 요청사항 현재 인덱스

  // 좌측 패널 상단 탭 데이터
  const tabs: tabItem[] = [
    { key: 'overview', icon: AiFillFileText, sizeClass: 'w-6 h-6' },
    { key: 'request', icon: BiSolidUser, sizeClass: 'w-7 h-7 translate-y-1/3' },
    { key: 'answer', icon: BsPencilFill },
  ];

  // 좌측 패널 실습 개요 데이터
  const overviewItems: overviewItem[] = [
    { title: '회사 소개', content: '회사(Instagram)에 대한 간단 설명' },
    {
      title: '실습 설명',
      content: `- 깃 연결 → main 브랜치를 기준으로 작업 브랜치 checkout (예: feat/saved-posts-api)\n- 페이지 구성 (라우팅 구현)\n- 홈(피드): 게시물 카드 우하단에 저장(북마크) 아이콘 배치 → 클릭 시 저장/해제 API 호출\n- 프로필(/:username)에 Saved(저장됨) 탭/섹션 추가 → 진입 시 저장 목록 조회 API 호출해 렌더링\n- API 연동\n- POST /api/v1/saved: { postId } 저장\n- DELETE /api/v1/saved/{postId}: 저장 해제\n- GET /api/v1/saved: 내가 저장한 게시물 목록 조회\n- 모든 요청에 Authorization: Bearer <JWT> 헤더 포함(2~3주차 로그인에서 저장한 토큰 사용)\n- UI/동작 세부\n- 저장/해제 시 아이콘 상태 즉시 토글 → 실패 시 롤백 & 에러 안내\n- 프로필 Saved 섹션: 그리드 카드로 표시(모바일 1열, 데스크톱 2열 이상)\n- 비로그인 상태에서 저장 시도 → 안내 alert 후 /login으로 리다이렉션\n- 오류/로딩 처리\n- 버튼/아이콘에 로딩 상태 반영(중복 클릭 방지)\n- 백엔드 오류코드별 메시지 노출(아래 문서 섹션 참고)\n- 기능 동작 확인 후 작업 브랜치 push\n- 작업 브랜치 → main으로 Pull Request 생성\n⇒ 위 동작들은 Hackplay에 삽입된 Code Editor 내에서 수행 가능해야 함`,
    },
    { title: '실습 결과', content: '텍스트를 입력하세요 (실습 결과)' },
  ];

  // 좌측 패널 - 직무별 요청사항(두 번째 탭) 데이터
  const requests: request[] = [
    {
      role: JOB_TYPES.PLAN,
      image: PlannerImg,
      content:
        '회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요. 전부 입력되기 전까지 가입 버튼 비활성화 해주세요. 성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요. 로딩 중엔 버튼 라벨을 **‘가입 중…’**으로 바꿔주세요.',
    },
    {
      role: JOB_TYPES.DESIGN,
      image: DesignerImg,
      content:
        '회원가입 시안은 피그마에 있어요. 폰트는 Pretendard, 버튼 색 #0070f3 / hover #005bb5. placeholder는 ‘이름 입력’, ‘이메일 주소 입력’, ‘비밀번호 입력’, ‘비밀번호 확인’. 에러 메시지는 입력창 하단 **빨간색(#FF4D4F)**으로 표시해주세요. 모바일에선 입력창 100% 폭, 버튼 하단 여백 16px.',
    },
    { role: JOB_TYPES.FE, image: FEDeveloperImg, content: '텍스트를 입력하세요. (요청사항)' },
    {
      role: JOB_TYPES.BE,
      image: BEDeveloperImg,
      content:
        '회원가입 API는 **/api/v1/register**로 POST입니다. Body에 name, email, password 주세요. 성공 시 201 Created로 사용자 정보를 JSON으로 반환하고, 토큰은 발급하지 않아요(로그인은 3주차에서 별도 진행). 실패 시 400/409/422/500 등 상태 코드로 내려줄게요.',
    },
  ];

  const filteredRequests = requests.filter((request) => request.role !== userRole); // 직무별 요청사항 필터링 - 사용자 직무 제외

  // 직무별 요청사항 인덱스 이동
  const handlePrevRequest = () => {
    setCurrentRequestIndex((prev) => (prev > 0 ? prev - 1 : filteredRequests.length - 1));
  };
  const handleNextRequest = () => {
    setCurrentRequestIndex((prev) => (prev < filteredRequests.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="px-[3.164rem] pt-[1.009rem] pb-[2.688rem] flex gap-[0.813rem] h-[calc(100vh-5.095rem)]">
      {/* 좌측 패널 */}
      <div className="bg-gray-90 p-[0.969rem] flex-[0_0_31.9%] max-w-[31.9%] rounded-2xl shadow-1 flex flex-col">
        {/* 좌측 패널 - 탭 */}
        <div className="flex gap-[0.063rem]">
          {tabs.map((tab) => {
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`basis-1/3 rounded-t-2xl h-[4.375rem] flex justify-center shadow-1 last:shadow-none ${activeTab === tab.key ? 'bg-white' : 'bg-gray-150'}`}
              >
                <tab.icon className={`translate-y-1/2 ${tab.sizeClass ?? ''}`} />
              </button>
            );
          })}
        </div>

        {/* 좌측 패널 - 내용 */}
        <div className="bg-white h-full rounded-2xl -mt-6 overflow-auto shadow-1">
          {/* 1. 실습 개요 패널 */}
          {activeTab === 'overview' && (
            <div className="flex flex-col pt-6 px-7 pb-[4.063rem]">
              {/* 직무 배지 */}
              <div className="flex ml-[0.175rem] mb-[0.419rem] bg-blue-300 w-fit rounded-2.7xl px-[0.419rem] py-[0.134rem]">
                <span className="font-[590] text-[0.542rem]/[1.25] tracking-[0.03em] text-white">
                  {userRole}
                </span>
              </div>

              {overviewItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-[0.43rem] mb-[3.353rem] last:mb-0 pr-15 last:pr-0"
                >
                  <h3 className="font-[590] text-2xl/[1.17] tracking-wider">{item.title}</h3>
                  {item.title === '실습 결과' && (
                    <div className="mt-[0.787rem] mb-[0.695rem] bg-gray-90 h-64 flex items-center justify-center rounded-xs">
                      <span className="font-[410] text-[0.938rem]/[1.33] tracking-[0.03em]">
                        (실습 내용 사진)
                      </span>
                    </div>
                  )}
                  <p
                    className={`font-[410] leading-[1.33] tracking-[0.03em] whitespace-pre-line ${item.title === '실습 결과' ? 'text-[0.938rem]' : 'text-[0.812rem]'}`}
                  >
                    {item.content}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 2. 요청 사항 패널 */}
          {activeTab === 'request' && (
            <div className="h-full pt-[1.919rem] px-[1.375rem] pb-[2.875rem] flex flex-col">
              <div className="flex-1 overflow-x-hidden flex">
                <div
                  className="flex w-full h-full transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentRequestIndex * 100}%)` }}
                >
                  {filteredRequests.map((request, index) => (
                    <div key={index} className="flex flex-col items-center min-w-full">
                      {/* 직무 배지 */}
                      <div className="flex px-[1.527rem] py-[0.363rem] bg-blue-400 rounded-1.5xl mb-[0.231rem]">
                        <span className="text-[0.938rem]/[1.2] text-white">{request.role}</span>
                      </div>

                      {/* 직무 아바타 */}
                      <div className="flex w-[11.563rem] h-[18.063rem] mb-3.5">
                        <img src={request.image} alt="" className="object-contain" />
                      </div>

                      {/* 요청사항 및 화살표 버튼 */}
                      <div className="flex flex-1 w-full max-h-[25.813rem] items-center gap-[0.719rem]">
                        <button
                          onClick={handlePrevRequest}
                          className="flex w-8 h-8 bg-white shadow-9 rounded-full items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-colors hover:shadow-4 transition-shadow"
                        >
                          <FaChevronLeft className="w-2 stroke-30" />
                        </button>
                        <div className="flex-1 h-full bg-gray-90 rounded-lg px-[1.813rem] py-[1.125rem] overflow-auto flex flex-col gap-[0.438rem]">
                          <h4 className="font-[590] text-2xl/[1.17] tracking-[0.03em]">요청사항</h4>
                          <p className="font-[410] text-[0.938rem]/[1.33] whitespace-pre-wrap">
                            {request.content}
                          </p>
                        </div>
                        <button
                          onClick={handleNextRequest}
                          className="flex w-8 h-8 bg-white shadow-9 rounded-full items-center justify-center text-blue-400 hover:bg-blue-400 hover:text-white transition-colors hover:shadow-4 transition-shadow"
                        >
                          <FaChevronRight className="w-2 stroke-30" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 인디케이터 */}
              <div className="flex justify-center gap-[0.563rem] mt-[1.875rem]">
                {filteredRequests.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentRequestIndex(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      index === currentRequestIndex ? 'bg-blue-400' : 'bg-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div>코드 에디터</div>
    </div>
  );
};

export default CodeEditorPage;
