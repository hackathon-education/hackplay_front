import { useState } from 'react';
import { AiFillFileText } from 'react-icons/ai';
import { BiSolidUser } from 'react-icons/bi';
import { BsPencilFill } from 'react-icons/bs';

import { JOB_TYPES } from '@/constants/jobTypes';

// 좌측 패널 탭 아이템 인터페이스
interface tabItem {
  key: 'overview' | 'request' | 'answer';
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  sizeClass?: string;
}

// 좌측 패널 실습 개요 아이템 인터페이스
interface overviewItem {
  title: string;
  content: string;
}

const CodeEditorPage = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'request' | 'answer'>('overview');

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
        <div className="bg-white h-full rounded-2xl -mt-6 overflow-auto scrollbar-thin scrollbar-thumb-sky-700">
          {/* 1. 실습 개요 패널 */}
          {activeTab === 'overview' && (
            <div className="flex flex-col pt-6 px-7 pb-[4.063rem]">
              {/* 직무 배지 */}
              <div className="flex ml-[0.175rem] mb-[0.419rem] bg-blue-300 w-fit rounded-2.7xl px-[0.419rem] py-[0.134rem]">
                <span className="font-[590] text-[0.542rem]/[1.25] tracking-[0.03em] text-white">
                  {JOB_TYPES.FE}
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
        </div>
      </div>
      <div>코드 에디터</div>
    </div>
  );
};

export default CodeEditorPage;
