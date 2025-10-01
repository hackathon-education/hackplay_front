import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';

// 프로젝트 개요 아이템 타입
interface OverviewItemProps {
  title: string;
  content: string;
}

// 프로젝트 개요 아이템 컴포넌트
const OverviewItem = ({ title, content }: OverviewItemProps) => {
  return (
    <div className="flex flex-col items-center w-22 max-w-22 h-full justify-between">
      <div className="w-[4.065rem] aspect-square rounded-full bg-gray-200" />
      <div className="flex flex-col items-center h-full max-h-[2.625rem] justify-between">
        <div className="text-[1.2rem] leading-[1.15] font-[590]">{title}</div>
        <div className="text-[0.975rem] leading-[1.15] text-gray-650">{content}</div>
      </div>
    </div>
  );
};

function FrontIntermediatePage() {
  const navigate = useNavigate();

  // 프로젝트 개요 아이템 데이터
  const overviewItems: OverviewItemProps[] = [
    { title: 'Team', content: 'hackplay' },
    { title: 'Projects', content: '개발하기' },
    { title: 'Goals', content: '달성 완료 (1/5)' },
  ];

  const goToTeamProject = () => {
    navigate(ROUTES.COURSES.LECTURE_MAIN('fe', 'intermediate', 'team-project'));
  };

  return (
    <div className="page-container pt-[4.344rem]">
      {/* 헤더 */}
      <div className="w-26 aspect-square rounded-full bg-white shadow-7 flex items-center justify-center p-4">
        <img src={`${import.meta.env.BASE_URL}favicon/apple-touch-icon.png`} alt="아이콘" />
      </div>
      <h2 className="mt-9 text-[4.375rem] tracking-[0.02em] leading-[1.17] mb-[0.313rem]">
        <span className="font-[590]">홍길동</span>님, 환영합니다! 👋
      </h2>
      <p className="font-[410] text-[2rem] leading-[1.625] tracking-[0.04em]">
        함께 프로젝트를 진행하게 되어 기뻐요. 함께 멋진 결과물을 만들어봅시다!
      </p>

      <div className="mt-11 flex w-full gap-[1.875rem] h-[54.813rem]">
        {/* 프로젝트 정보 */}
        <div className="flex-[659]">
          <div className="flex flex-col card-box h-full py-15 px-[3.313rem] items-center">
            {/* 포지션 */}
            <div className="rounded-full w-[8.563rem] aspect-square bg-linear-153 blue-gradient to-82%"></div>
            <h3 className="mt-[2.375rem] font-[590] text-4xl leading-[1.17] tracking-[0.02em]">
              <span className="font-[680]">홍길동</span>님의 포지션
            </h3>
            <div className="mt-[0.813rem] max-w-[23.438rem] py-[1.35rem] px-[4.438rem] rounded-5xl bg-linear-90 blue-gradient from-19% to-68%">
              <span className="font-[590] text-[1.75rem] leading-[1.18] text-white">
                Backend Developer
              </span>
            </div>

            {/* 프로젝트 시작일 */}
            <div className="mt-[2.676rem] bg-gray-50 w-full rounded-2xl px-[8.125rem] py-[1.875rem]">
              <div className="flex flex-col items-center">
                <div className="max-w-[4.688rem] aspect-square bg-blue-100/80 rounded-full p-5">
                  <AiOutlineCalendar className="w-[2.188rem] h-[2.188rem] text-blue-400 stroke-15" />
                </div>
                <p className="mt-[1.625rem] text-[1.625rem] leading-[1.15] tracking-[0.02em]">
                  프로젝트 시작일
                </p>
                <p className="mt-[0.688rem] font-[680] text-[2.411rem] leading-[1.17] tracking-[0.03em] text-blue-400">
                  2025년 05월 17일
                </p>
              </div>
            </div>

            {/* 프로젝트 개요 */}
            <div className="mt-auto flex w-full max-w-[26.813rem] h-full max-h-[7.625rem] items-center justify-between">
              {overviewItems.map((item, idx) => (
                <OverviewItem key={idx} title={item.title} content={item.content} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-[829]">
          <div className="card-box h-full">팀 프로젝트</div>
        </div>
      </div>

      {/* <div className="tab-wrapper">
        <div className="level-tab level-intermediate locked">
          front 기초 언어 (HTML/CSS/JS) 강의 - 추후 개발 🔒
        </div>
        <div
          className="level-tab level-beginner active"
          onClick={goToTeamProject}
          style={{ cursor: 'pointer' }}
        >
          실전 Team Project 해보기 강의
        </div>
      </div>
      <div className="tab-content">
        <p>React로 실제 프론트 MVP를 만드는 실습 강의가 이곳에 제공될 예정입니다.</p>
      </div> */}
    </div>
  );
}

export default FrontIntermediatePage;
