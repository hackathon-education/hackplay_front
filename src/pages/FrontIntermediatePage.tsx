import { AiOutlineCalendar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import LockModal from '@/components/LockModal';
import { ROUTES } from '@/constants/routes';
import { useLockModal } from '@/hooks/useLockModal';

// 프로젝트 개요 아이템 타입
interface OverviewItemProps {
  title: string;
  content: string;
}

// 강의 목록 아이템 타입
interface LectureItemProps {
  title: string;
  locked?: boolean;
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

// 팀원 프로필 컴포넌트
const CollaborationDots = () => {
  const colors = ['bg-blue-400', 'bg-blue-200', 'bg-blue-300'];

  return (
    <div className="flex max-h-[6.193rem]">
      {colors.map((color, idx) => (
        <div className="flex w-[6.193rem] aspect-square bg-gray-80 rounded-full -ml-[1.509rem] first:ml-0 p-[0.516rem]">
          <div key={idx} className={`${color} w-full h-full rounded-full`}></div>
        </div>
      ))}
    </div>
  );
};

// 강의 목록 아이템 컴포넌트
const LectureItem = ({ title, onClick }: LectureItemProps & { onClick: () => void }) => {
  return (
    <li
      onClick={onClick}
      className="bg-gray-50 h-33 flex items-center justify-center rounded-2xl cursor-pointer"
    >
      <span className="text-[1.908rem] leading-[1.16] tracking-[0.03em]">{title}</span>
    </li>
  );
};

const FrontIntermediatePage = () => {
  const navigate = useNavigate();
  const { isLockModalOpen, openLockModal, closeLockModal } = useLockModal(); // 잠금 모달 훅

  // 프로젝트 개요 아이템 데이터
  const overviewItems: OverviewItemProps[] = [
    { title: 'Team', content: 'hackplay' },
    { title: 'Projects', content: '개발하기' },
    { title: 'Goals', content: '달성 완료 (1/5)' },
  ];

  // 강의 목록 아이템 데이터
  const lectureItems: LectureItemProps[] = [
    { title: '프론트엔드 심화 언어를 배우고 싶다면?', locked: true },
    { title: '바로 Project 시작하기!' },
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

      {/* 메인 */}
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

        {/* 워크스페이스 */}
        <div className="flex-[829]">
          <div className="card-box h-full pt-15 pb-[4.063rem] px-15 flex flex-col items-center">
            {/* 헤더 */}
            <h3 className="font-[590] text-4xl leading-[1.17] tracking-[0.01em]">
              Team Project Workspace
            </h3>
            <p className="mt-[0.813rem] mb-[2.688rem] font-[410] text-[1.75rem] leading-[1.18] tracking-[0.01em]">
              당신의 프로젝트 팀과 원활하게 협업해 보세요!
            </p>
            <CollaborationDots />

            {/* 강의 목록 */}
            <ul className="mt-[2.994rem] w-full h-full flex flex-col gap-[2.438rem] justify-center">
              {lectureItems.map((item, idx) => (
                <LectureItem
                  key={idx}
                  title={item.title}
                  onClick={item.locked ? openLockModal : goToTeamProject}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="flex h-[2.438rem] mt-[3.813rem] mb-38">
        <p className="text-2xl leading-[1] text-gray-600">
          단순한 강의 시청이 아닌, 코드를 직접 작성하고 실시간 피드백을 통해 실력을 키워나갈 수
          있습니다.
        </p>
      </div>

      {/* 잠금 모달 */}
      <LockModal
        isOpen={isLockModalOpen}
        onClose={closeLockModal}
        message="이 강의는 현재 잠겨 있습니다."
      />
    </div>
  );
};

export default FrontIntermediatePage;
