import { AiOutlineCalendar, AiOutlineTeam } from 'react-icons/ai';
import { RiFlag2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import { Progress } from 'antd';

import { ROUTES } from '@/constants/routes';

// 프로젝트 정보 아이템 타입
interface ProjectInfoItemProps {
  icon: React.ReactNode;
  label?: string;
  content: string;
}

// 강의 진행 상태 배지 타입
interface StatusBadgeProps {
  color: string;
  label: string;
}

// 프로젝트 진행 상태 타입
type ProjectStatus = 'COMPLETED' | 'IN_PROGRESS' | 'NOT_STARTED';

// 유닛 아이템 타입
interface UnitItemProps {
  path: string;
  status: ProjectStatus;
}

// 유닛 아이템 더미 데이터 (추후 API 연동으로 대체 예정)
const unitItemsData: UnitItemProps[] = [
  { path: 'team-project-1', status: 'COMPLETED' },
  { path: 'team-project-2', status: 'NOT_STARTED' },
  { path: 'team-project-3', status: 'NOT_STARTED' },
  { path: 'team-project-4', status: 'NOT_STARTED' },
];

// 프로젝트 정보 아이템 컴포넌트
const ProjectInfoItem = ({ icon, label, content }: ProjectInfoItemProps) => {
  return (
    <div className="flex gap-1.5 text-white">
      {icon}
      <div className="font-[410] text-[1.063rem] leading-[1.18] tracking-[0.01em]">
        {label && `${label}: `}
        {content}
      </div>
    </div>
  );
};

// 강의 진행 상태 배지 컴포넌트
const StatusBadge = ({ color, label }: StatusBadgeProps) => {
  return (
    <div className="flex items-center gap-[0.938rem]">
      <div className={`w-5 h-5 rounded-full ${color}`} />
      <span className="text-xl font-[410] text-gray-800 leading-[1.15]">{label}</span>
    </div>
  );
};

// 유닛 아이템 컴포넌트
const UnitItem = ({ path }: UnitItemProps) => {
  return (
    <li className="flex gap-[2.063rem]">
      <div className="w-[4.063rem] h-[4.063rem] rounded-full bg-gray-200"></div>
      <div className="w-full max-w-[81rem] h-[24.5rem] rounded-2.5xl bg-gray-250">
        <Link to={ROUTES.WORKSPACE(path)}>학습하기</Link>
      </div>
    </li>
  );
};

const TeamProjectPage = () => {
  // 프로젝트 정보 아이템 데이터
  const projectInfoItems = [
    {
      icon: <AiOutlineCalendar className="w-5 h-5 stroke-15" />,
      label: '시작일',
      content: '2025년 05월 17일',
    },
    {
      icon: <AiOutlineTeam className="w-5 h-5 stroke-15" />,
      content: '8 Team Members',
    },
  ];

  // 학습 목표 아이템 데이터
  const learningObjectives = [
    '• Github 협업 경험해보기',
    '• 컴포넌트 분담 및 UI 구현',
    '• 협업 커뮤니케이션 도구 사용',
  ];

  // 강의 진행 상태 배지 데이터
  const statuses = [
    { color: 'bg-green', label: '진행 완료' },
    { color: 'bg-blue-330', label: '진행중' },
    { color: 'bg-yellow', label: '시작 전' },
  ];

  return (
    <div className="page-container">
      <div className="grid grid-cols-9 w-full gap-x-[1.875rem] mt-[4.907rem]">
        {/* 프로젝트 프로필 */}
        <section className="flex col-span-6 max-h-[20.375rem] max-h-[20.375rem] pl-10 pr-8 pt-[2.063rem] pb-[10.811rem] rounded-2xl bg-linear-270 from-blue-400 via-blue-350 via-19% to-blue-420 shadow-8">
          <div className="flex max-h-[7.502rem] gap-[1.873rem]">
            {/* 깃발 아이콘 */}
            <div className="flex w-[7.502rem] max-w-[7.502rem] h-[7.502rem] p-7 bg-white/30 rounded-2xl items-center justify-center">
              <RiFlag2Line className="w-15 h-15 text-white" />
            </div>
            {/* 프로젝트 개요 */}
            <div className="pt-3.5 pb-[1.189rem] flex flex-col justify-between">
              <h1 className="text-[2.839rem] font-[590] leading-[1.17] tracking-[0.02em] text-white">
                프로젝트 내용 (프로젝트 목적)
              </h1>
              <div className="flex gap-[3.625rem]">
                {projectInfoItems.map((item, idx) => (
                  <ProjectInfoItem
                    key={idx}
                    icon={item.icon}
                    label={item.label}
                    content={item.content}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 학습 목표 및 진행도 */}
        <section className="col-span-3 flex flex-col text-start rounded-2xl bg-white shadow-8">
          <div className="border-b border-gray-250 pt-[1.625rem] pb-[1.313rem] pl-[2.625rem]">
            <h2 className="font-[590] text-4xl leading-[1.17] tracking-[0.02em]">학습 목표</h2>
          </div>
          <div className="flex flex-col pt-[2.125rem] pb-7 px-[3.625rem] h-full justify-between">
            {/* 학습 목표 */}
            <ul className="flex flex-col gap-[1.313rem]">
              {learningObjectives.map((item, idx) => (
                <li key={idx} className="font-[410] text-2xl leading-[1.17]">
                  {item}
                </li>
              ))}
            </ul>
            {/* 진행도 */}
            <Progress
              percent={77.5}
              showInfo={false}
              strokeWidth={12}
              trailColor="var(--color-gray-200)"
              strokeColor="var(--color-blue-400)"
            ></Progress>
          </div>
        </section>

        {/* 회사 소개 */}
        <section className="mt-[3.563rem] col-span-9 flex flex-col text-start rounded-2xl bg-white shadow-8">
          <div className="border-b border-gray-250 pt-[1.875rem] pb-[1.563rem] pl-12">
            <h2 className="font-[590] text-4xl leading-[1.17] tracking-[0.02em]">회사 소개</h2>
          </div>
          <div className="flex px-[3.813rem] gap-[3.438rem] pt-[2.313rem] pb-[2.688rem]">
            <div className="w-[31.375rem] h-64 bg-gray-250 rounded-2.5xl"></div>
            <p className="pt-[0.813rem] font-[410] text-[2rem] leading-[1.16] tracking-[0.03em]">
              텍스트를 입력하세요
            </p>
          </div>
        </section>

        {/* 주차별 타임라인 */}
        <section className="mt-[4.625rem] mb-[17.688rem] col-span-9 flex flex-col text-start rounded-2xl bg-white shadow-8">
          <div className="border-b border-gray-250 pt-[2.375rem] pb-[1.563rem] pl-12">
            <h2 className="font-[590] text-4xl leading-[1.17] tracking-[0.02em]">
              주차별 타임라인
            </h2>
          </div>
          <div className="flex flex-col pt-[2.438rem] pb-[3.875rem] px-[3.906rem]">
            <div className="flex justify-end mr-[1.563rem] gap-10">
              {statuses.map((status, idx) => (
                <StatusBadge key={idx} color={status.color} label={status.label} />
              ))}
            </div>
            {/* 유닛 목록 */}
            <ol className="mt-5 flex flex-col gap-[4.688rem]">
              {unitItemsData.map((item, idx) => (
                <UnitItem key={idx} path={item.path} status={item.status} />
              ))}
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TeamProjectPage;
