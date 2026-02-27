// TODO: 페이지 반응형 개선
import FolderIcon from '@/assets/lecture/folder-icon.svg?react';
import MoneyBagIcon from '@/assets/lecture/money-bag-icon.svg?react';
import PersonIcon from '@/assets/lecture/person-icon.svg?react';
import RoadmapIcon from '@/assets/lecture/roadmap-icon.svg?react';
import RocketIcon from '@/assets/lecture/rocket-icon.svg?react';
import TeamMembersIcon from '@/assets/lecture/team-members-icon.svg?react';
import TimeIcon from '@/assets/lecture/time-icon.svg?react';
import ToggleArrowIcon from '@/assets/lecture/toggle-arrow-icon.svg?react';
import WorkflowIcon from '@/assets/lecture/workflow-icon.svg?react';
import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import BooksIcon from '@/assets/lecture/books-icon.webp';
import CodingWomanIllustration from '@/assets/lecture/coding-woman-illustration.webp';
import LectureMainBg from '@/assets/lecture/lecture-main-bg.webp';
import StarRatingIcon from '@/assets/lecture/star-rating-icon.webp';
import CategoryBadge from '@/components/lecture/CategoryBadge';
import FeatureCard from '@/components/lecture/FeatureCard';
import ReviewCard, { ReviewProps } from '@/components/lecture/ReviewCard';
import UnitItem from '@/components/lecture/UnitItem';
import { UnitItemProps } from '@/components/lecture/UnitItem';

// --- Types ---
interface ChapterProps {
  number: string;
  category: string;
  title: string;
  description: string;
  units: UnitItemProps[];
}

// --- Mock Data ---
const LECTURE_INFO = {
  title: '프론트엔드 협업 & 기능 구현 실전 코스',
  subTitle: 'Git 협업부터 기능 개발까지, 회사 흐름 그대로',
  categories: ['FRONTEND', 'COLLABORATION'],
  rating: 4.9,
  reviewCount: 120,
  teamCount: 4,
};

const COURSE_INFO = [
  // { icon: <TimeIcon />, label: '학습 시간', value: '약 12시간' },
  { icon: <MoneyBagIcon />, label: '수강료', value: '무료' },
  { icon: <PersonIcon />, label: '총 수강생', value: '42,300명' },
];

const LEARNING_GOALS = [
  '회사에서 사용하는 프론트엔드 협업 구조와 Git 흐름 이해',
  '이슈 → 브랜치 → 커밋 → PR → 머지까지 개발 사이클 경험',
  '회원가입, 로그인 등 필수 서비스 기능 직접 구현',
  'API 연동, 에러 처리, UX까지 고려한 실제 기능 개발',
  '“혼자 만드는 코드”가 아닌 팀에서 통하는 코드 감각 경험',
];

const TABS = [
  { id: 'intro', label: '강의 소개' },
  { id: 'curriculum', label: '커리큘럼' },
  { id: 'reviews', label: '수강평' },
];

// TODO: 각 unit별 duration 총합 계산 -> 학습 시간(학습 정보 카드)으로 표기
const CHAPTERS: ChapterProps[] = [
  {
    number: '01',
    category: 'COLLABORATION_WORKFLOW',
    title: '회사 협업 방식 익히기',
    description: '프로젝트 구조와 팀의 개발 약속을 이해한다.',
    units: [
      {
        id: '1-1',
        title: '팀 프로젝트 구조 이해',
        type: 'Lesson',
        duration: 65,
        isLocked: false,
      },
      {
        id: '1-2',
        title: '프론트엔드 소스 구조 이해',
        type: 'Lesson',
        duration: 150,
      },
      {
        id: '1-3',
        title: '스타일(CSS)과 코드 관리 규칙 이해',
        type: 'Lesson',
        duration: 55,
      },
      {
        id: '1-4',
        title: 'Github 관리 파일 이해',
        type: 'Lesson',
        duration: 55,
      },
      {
        id: '1-5',
        title: '로컬 개발 환경 & 데이터베이스 세팅',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '1-6',
        title: 'Git 원격 레포 연결 실습',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '1-7',
        title: '직무별 협업 흐름 이해',
        type: 'Lesson',
        duration: 55,
      },
    ],
  },
  {
    number: '02',
    category: 'GIT_WORKFLOW_PRACTICE',
    title: '간단한 이슈 해결 & Git 실습',
    description: '이슈 단위로 작업하고, PR까지 완주한다.',
    units: [
      {
        id: '2-1',
        title: '팀 코드와 로컬 환경 동기화',
        type: 'Practice Lab',
        duration: 65,
      },
      {
        id: '2-2',
        title: '이슈를 생성하고 작업 범위 정의',
        type: 'Lesson',
        duration: 150,
      },
      {
        id: '2-3',
        title: '이슈 단위 브랜치로 작업 흐름 구성',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '2-4',
        title: '변경 사항 커밋 규칙 이해 및 적용',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '2-5',
        title: 'Pull Request로 변경 사항 공유',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '2-6',
        title: '리뷰 피드백 반영 흐름 이해',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '2-7',
        title: '머지 후 브랜치 정리 마무리',
        type: 'Practice Lab',
        duration: 55,
      },
    ],
  },
  {
    number: '03',
    category: 'AUTHENTICATION_ARCHITECTURE',
    title: '인증 구조 설계와 책임 분리',
    description: '사용자가 서비스에 들어올 수 있는 “문”을 만든다.',
    units: [
      {
        id: '3-1',
        title: '회원가입 화면 구성',
        type: 'Practice Lab',
        duration: 65,
      },
      {
        id: '3-2',
        title: '회원가입 유효성 검사',
        type: 'Practice Lab',
        duration: 150,
      },
      {
        id: '3-3',
        title: '회원가입 API 연동',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '3-4',
        title: '회원가입 성공과 실패 처리 흐름 구성',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '3-5',
        title: '로그인 화면 구성',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '3-6',
        title: 'JWT 토큰 저장과 인증 상태 유지',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '3-7',
        title: '로그인 실패 처리와 UX 보완',
        type: 'Practice Lab',
        duration: 55,
      },
    ],
  },
  {
    number: '04',
    category: 'STATE_MANAGEMENT_AND_UX',
    title: '상태 관리와 UX 품질 설계',
    description: '사용자의 행동이 서비스에 기록되게 만든다.',
    units: [
      {
        id: '4-1',
        title: '게시물 저장 UI 구현',
        type: 'Practice Lab',
        duration: 65,
      },
      {
        id: '4-2',
        title: '낙관적 업데이트로 저장 UX 구성',
        type: 'Practice Lab',
        duration: 150,
      },
      {
        id: '4-3',
        title: '게시물 저장 API 연동',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '4-4',
        title: '게시물 저장 해제 기능 구현',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '4-5',
        title: '인증 여부에 따른 저장 기능 접근 제어',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '4-6',
        title: 'Saved 목록 화면 구성',
        type: 'Practice Lab',
        duration: 55,
      },
      {
        id: '4-7',
        title: '로딩과 오류 상태 처리까지 완성',
        type: 'Practice Lab',
        duration: 55,
      },
    ],
  },
];

const formatTotalDuration = (units: { duration: number }[]) => {
  const totalMinutes = units.reduce((acc, unit) => acc + unit.duration, 0);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours}h ${minutes}m`;
};

const formatUnitDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const s = '00';

  if (h === 0) {
    return `${m}:${s}`;
  }

  return `${h}:${m.toString().padStart(2, '0')}:00`;
};

// --- 수강평 더미 데이터 ---
// TODO: 프론트 강의에 맞는 리뷰로 수정
const reviewsData: ReviewProps[] = [
  {
    userName: '백엔드 지망생',
    rating: 5,
    comment:
      '단순한 클론 코딩이 아니라 시스템 디자인 자체를 배울 수 있어서 좋았습니다. 면접에서 아키텍처 질문에 답변할 자신감이 생겼어요.',
  },
];

// --- Skeleton Components ---

const SkeletonBase = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-card-border/30 rounded-lg ${className}`} />
);

const HeroSkeleton = () => (
  <div className="flex flex-col gap-5.5">
    <div className="space-y-4">
      <div className="flex gap-2">
        <SkeletonBase className="w-24 h-8" />
        <SkeletonBase className="w-32 h-8" />
      </div>
      <SkeletonBase className="w-2/3 h-14" />
      <SkeletonBase className="w-1/2 h-14" />
      <div className="flex gap-8">
        <SkeletonBase className="w-40 h-6" />
        <SkeletonBase className="w-40 h-6" />
      </div>
    </div>
    <div className="flex gap-5.5 h-[502px]">
      <SkeletonBase className="flex-[1005] h-full rounded-20" />
      <SkeletonBase className="flex-[395] h-full rounded-20" />
    </div>
  </div>
);

const ChapterSkeleton = () => (
  <div className="w-full max-w-[929px] pl-15 mb-16.5">
    <div className="mb-7 space-y-4">
      <SkeletonBase className="w-48 h-6" />
      <SkeletonBase className="w-3/4 h-12" />
      <SkeletonBase className="w-full h-16" />
    </div>
    <SkeletonBase className="h-[300px] w-full rounded-10" />
  </div>
);

const ReviewSkeleton = () => (
  <div className="border border-card-border h-[221px] p-8 rounded-20 bg-card-bg shadow-2 space-y-6">
    <div className="flex gap-2">
      <SkeletonBase className="w-32 h-6" />
    </div>
    <SkeletonBase className="w-full h-12" />
    <div className="flex items-center gap-4">
      <SkeletonBase className="w-8 h-8 rounded-full" />
      <SkeletonBase className="w-20 h-5" />
    </div>
  </div>
);

const ChapterSection = ({ chapter }: { chapter: ChapterProps }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="w-full max-w-[929px] flex flex-col mb-12 lg:mb-16.5 pl-15">
      <div className="flex flex-col">
        <span className="mb-3 text-sm lg:text-xl font-bold text-text-accent uppercase">
          CHAPTER {chapter.number} <span className="inline-block -translate-y-px">•</span>{' '}
          {chapter.category}
        </span>
        <div className="flex items-center justify-between -ml-1 lg:-ml-15 mt-1">
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`flex items-center justify-center w-12 h-12 transition-all duration-300 hover:opacity-80 ${isOpen ? 'text-icon-blue-200' : '-rotate-90 text-text-accent'}`}
            >
              <ToggleArrowIcon />
            </button>
            <h3 className="text-2xl lg:text-[40px] font-medium text-text-meta -translate-y-[3px] leading-none">
              {chapter.title}
            </h3>
          </div>
          {/* <span className="mr-3.5 w-17.5 h-8 flex items-center justify-center bg-chip-active-bg rounded-10 font-medium text-text-meta">
                              {formatTotalDuration(chapter.units)}
                            </span> */}
        </div>
        <p className="text-base lg:text-2xl text-text-base font-medium mt-0.5 leading-[40px] tracking-widest">
          {chapter.description}
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden mt-7 rounded-10"
          >
            <div className="bg-card-bg rounded-10 border border-card-border shadow-2 overflow-hidden">
              <div className="flex items-center justify-between h-[45px] pl-6 pr-3.5 bg-icon-bg border-b border-card-border">
                <div className="flex items-center gap-[21px]">
                  <div className="flex gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-card-border" />
                    <div className="w-4 h-4 rounded-full bg-card-border" />
                  </div>
                  <div className="flex items-center gap-2.5 text-text-base font-medium tracking-widest">
                    <FolderIcon className="w-5.5 h-[19px]" />
                    src / modules / {chapter.number}
                  </div>
                </div>
                <span className="text-sm font-medium text-text-base">JavaScript</span>
              </div>
              <div className="divide-y divide-divider-strong">
                {chapter.units.map((unit) => (
                  <UnitItem key={unit.id} unit={unit} />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main Page Component ---

const TeamProjectPage = () => {
  const [activeTab, setActiveTab] = useState('intro'); // TODO: 탭 클릭 시 해당 섹션으로 스크롤 구현. 스크롤 시 탭 전환 구현.
  const [isLoading, setIsLoading] = useState(false); // TODO: API fetch 로직에 로딩 상태 연결

  return (
    <div className="relative overflow-hidden min-h-screen -mx-[15px] lg:-mx-5 -mt-16.5 lg:-mt-24 bg-bg">
      {/* 배경 컴포넌트 */}
      {/* TODO: 배경 지울지 확인 */}
      {/* <img src={LectureMainBg} className="absolute inset-0 w-full object-cover object-top z-0" /> */}
      <div className="relative z-base px-[15px] lg:px-5 pt-24 lg:pt-[215px] pb-[108.93px]">
        <div className="max-w-[1422px] mx-auto">
          {/* Hero Section */}
          {isLoading ? (
            <HeroSkeleton />
          ) : (
            <section className="grid lg:grid-cols-[1fr_395px] gap-5.5 mb-9.5">
              <div>
                <div className="flex gap-4.5">
                  {LECTURE_INFO.categories.map((cat) => (
                    <CategoryBadge key={cat}>{cat}</CategoryBadge>
                  ))}
                </div>
                <h1 className="text-4xl lg:text-[54px] font-bold text-text-title mb-4 leading-[1.2]">
                  {LECTURE_INFO.title}
                  <span className="block text-text-accent">{LECTURE_INFO.subTitle}</span>
                </h1>
                <div className="flex items-center gap-9.5 text-text-meta ml-0.5 text-xl">
                  <div className="flex items-center">
                    <img src={StarRatingIcon} alt="별점" className="w-9 h-9" />
                    <span className="font-semibold mr-2">{LECTURE_INFO.rating}</span>
                    <span>({LECTURE_INFO.reviewCount}+ 리뷰)</span>
                  </div>
                  <div className="flex items-center gap-[11px]">
                    <TeamMembersIcon className="text-text-meta" />
                    <span>{LECTURE_INFO.teamCount} Team Members</span>
                  </div>
                </div>

                {/* Banner */}
                <div className="relative lg:h-[502px] rounded-20 overflow-hidden border border-banner-border shadow-1 group mt-5.5">
                  <img
                    src={CodingWomanIllustration}
                    className="w-full h-full object-cover object-[50%_-32px] transition-transform duration-700 group-hover:scale-105"
                    alt="배너"
                  />
                  <div className="absolute inset-0 bg-gradient-banner-glass backdrop-blur-[4px]" />
                  <div className="absolute bottom-0 flex items-center bg-gradient-overlay w-full py-8.5">
                    <h2 className="text-2xl lg:text-[40px] font-semibold text-text-white pl-[41px] leading-none">
                      협업, 로그인 및 게시물 저장 기능 개발
                    </h2>
                  </div>
                </div>
              </div>

              {/* Info Card */}
              <aside className="lg:self-end h-[502px] bg-card-bg rounded-20 border border-card-border shadow-3 pb-6.5 flex flex-col">
                <h3 className="flex items-center gap-2.5 text-text-meta text-lg font-semibold px-5 pb-2.5 border-b border-divider leading-none pt-5.5">
                  <img src={BooksIcon} className="w-5 h-5" alt="" />
                  학습 정보
                </h3>
                <div className="space-y-4 px-5 py-6 mb-2">
                  {COURSE_INFO.map((info) => (
                    <div
                      key={info.label}
                      className="flex justify-between items-center text-[15px] text-text-title leading-tight"
                    >
                      <div className="flex items-center gap-1.5 text-icon">
                        {info.icon}
                        <span className="text-text-title">{info.label}</span>
                      </div>
                      <span className="font-medium">{info.value}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-5 mb-auto">
                  <div className="flex items-center gap-[15px] pl-[21px] pr-5">
                    <p className="font-semibold text-text-meta">학습 목표</p>
                    <hr className="flex-1 border-divider" />
                  </div>
                  <ul className="space-y-4.5 pl-5 pr-[15px]">
                    {LEARNING_GOALS.map((goal, i) => (
                      <li key={i} className="flex gap-1.5 text-text-title text-[15px]">
                        <span>·</span> {goal}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-5">
                  {/* TODO: 버튼 클릭 시 모달 삽입 */}
                  <button className="w-full h-11.5 bg-btn-default-bg hover:bg-btn-default-bg-hover active:bg-btn-default-bg-active active:scale-[0.98] transition-all rounded-xl font-bold text-sm text-btn-default-text">
                    수강하기
                  </button>
                </div>
              </aside>
            </section>
          )}

          {/* Tabs & Content */}
          <div className="max-w-[1007px] ml-[1px]">
            <nav className="flex w-fit gap-[45px] border-b-2 border-tab-border-default ml-5.5 mb-10.5">
              {isLoading ? (
                <div className="flex justify-between pb-2">
                  <SkeletonBase className="w-16 h-6" />
                  <SkeletonBase className="w-16 h-6" />
                  <SkeletonBase className="w-16 h-6" />
                </div>
              ) : (
                <>
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`pb-2 text-xl transition-all relative ${
                        activeTab === tab.id
                          ? 'font-medium text-tab-text-active'
                          : 'text-tab-text-default'
                      }`}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-tab-border-active" />
                      )}
                    </button>
                  ))}
                </>
              )}
            </nav>

            {/* Intro  Section */}
            <div className="pb-[33px] border-b-2 border-divider-strong">
              <div className="space-y-8 mb-15.5">
                <h2 className="text-3xl lg:text-[40px] font-bold text-text-title leading-none">
                  단순한 기능 구현을 넘어, 실무 흐름을 설계합니다.
                </h2>
                <div className="text-xl lg:text-[28px] text-text-body leading-[40px] tracking-widest font-medium">
                  <p>
                    대부분의 프론트엔드 강의는 화면을 그리고, API를 붙이고, “동작합니다”에서
                    끝납니다. 하지만 실무는 다릅니다.
                  </p>
                  <ul className="grid ml-3.5">
                    <li>
                      <span className="mr-3">•</span>이 기능은 어디에 만들어야 할까요?
                    </li>
                    <li>
                      <span className="mr-3">•</span>API 요청은 왜 여기서 호출하면 안 될까요?
                    </li>
                    <li>
                      <span className="mr-3">•</span>에러가 났을 때, 사용자에게는 어떻게 보여줘야
                      할까요?
                    </li>
                  </ul>
                  <p>
                    이 강의는 “되기만 하는 코드”가 아니라, “팀에서 통하는 코드”를 만드는 방법을
                    다룹니다.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-26 px-13.5 mb-13">
                <FeatureCard
                  icon={<RocketIcon />}
                  title="협업을 전제로 한 구조 설계"
                  desc="프로젝트 폴더 구조, 역할 분리, 파일 위치까지 “왜 이렇게 나뉘는지”를 기준으로 이해합니다."
                />
                <FeatureCard
                  icon={<WorkflowIcon />}
                  title="실제 회사 Git 흐름"
                  desc="이슈 생성 → 브랜치 분기 → 커밋 → PR → 머지 등 혼자서는 절대 익히기 힘든 협업 사이클을 그대로 경험합니다."
                />
              </div>
              <p className="text-text-body leading-[40px] text-[28px] tracking-widest font-medium">
                이 강의는 단순한 코드 받아쓰기 강의가 아닙니다. 각 단계마다 이런 질문을 던집니다.
                “왜 이렇게 설계했을까?”, “회사에서는 이걸 어떻게 판단할까?”
                <br />그 질문에 답하는 과정이 당신을 ‘혼자 일하는 개발자’에서 ‘팀의 개발자’로
                바꿔줍니다.
              </p>
            </div>

            {/* Curriculum */}
            <section className="mt-1.5 border-b-2 border-tab-border-default">
              {isLoading ? (
                <div className="pl-[21px] mt-20">
                  {[1, 2].map((i) => (
                    <ChapterSkeleton key={i} />
                  ))}
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3.5 mb-10.5 text-text-accent">
                    <div className="p-[12.5px] bg-icon-bg rounded-10">
                      <RoadmapIcon />
                    </div>
                    <h3 className="text-xl font-bold tracking-[1px] uppercase">
                      Engineering Roadmap
                    </h3>
                  </div>

                  <h2 className="text-[40px] font-bold text-text-title ml-0.5 mb-7">
                    프론트엔드 중급 과정 커리큘럼
                  </h2>
                  <p className="text-text-body text-2xl tracking-[1.2px] font-medium w-[790px] leading-[1.24] mb-8">
                    엔지니어로서 마주할 복잡한 문제들을 하나씩 해결해가며 마일스톤을 달성하세요. 각
                    섹션은 실무 아키텍처를 그대로 반영합니다.
                  </p>
                  <div className="pl-[21px]">
                    {CHAPTERS.map((chapter) => (
                      <ChapterSection key={chapter.number} chapter={chapter} />
                    ))}
                  </div>
                </>
              )}
            </section>

            {/* Reviews */}
            <section className="mt-17.5 max-w-[952px] mx-auto">
              <h2 className="text-[40px] font-bold text-text-title mb-5">수강평</h2>
              <div className="grid md:grid-cols-2 gap-x-[105px] gap-y-4 ml-[55px]">
                {isLoading
                  ? Array.from({ length: 4 }).map((_, i) => <ReviewSkeleton key={i} />)
                  : Array.from({ length: 10 }).map((_, i) => (
                      <ReviewCard key={`${reviewsData[0].userName}-${i}`} review={reviewsData[0]} />
                    ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProjectPage;
