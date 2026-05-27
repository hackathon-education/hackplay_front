import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BookOpenText,
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  CreditCard,
  FileText,
  GitBranch,
  Home,
  type LucideIcon,
  MessageSquareText,
  MonitorPlay,
  PenLine,
  Rocket,
  RotateCcw,
  Sparkles,
  UsersRound,
  X,
  XCircle,
} from 'lucide-react';
import { type CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';

import MainCharacterGroup from '@/assets/common/main-character-group.webp';
import { ROUTES } from '@/constants/routes';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
  tone?: 'light' | 'dark';
}

interface QuizFeature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ProjectFinderStep {
  message: string;
  options: string[];
}

interface PricingCard {
  title: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
}

interface ConcernQACard {
  question: string;
  answerLead: string;
  answerBody: string;
}

interface WebProductionFlowStep {
  id: string;
  step: string;
  label: string;
  title: string;
  description: string;
  detailTitle: string;
  details: string[];
  icon: LucideIcon;
  offsetX: string;
  offsetY: string;
  detailClassName: string;
}

const QUIZ_FEATURES: QuizFeature[] = [
  {
    title: '틀린 문제만 빠르게 복습',
    description: '오답 문항을 모아 다시 풀 수 있어 학습 시간이 흐트러지지 않습니다.',
    icon: RotateCcw,
  },
  {
    title: '답안과 선택 이유를 한눈에',
    description: '내가 고른 선택지와 정답을 비교하며 개념을 정확히 다시 잡습니다.',
    icon: XCircle,
  },
  {
    title: '실습 맥락으로 돌아가기',
    description: '퀴즈를 끝내면 메인 또는 코드 에디터로 돌아가 바로 적용할 수 있습니다.',
    icon: Home,
  },
];

const PROJECT_FINDER_STEPS: ProjectFinderStep[] = [
  {
    message: '처음부터 완벽히 고를 필요 없어요. 지금 해보고 싶은 역할부터 골라주세요.',
    options: ['프론트엔드', '백엔드', '디자인', '기획 / PM', '데이터 / 자동화'],
  },
  {
    message: '어떤 서비스를 만들어보고 싶나요?',
    options: [
      '커뮤니티',
      '예약 / 신청 서비스',
      '대시보드',
      '스터디 / 학습 서비스',
      '생활 편의 서비스',
    ],
  },
  {
    message: '일주일에 어느 정도 참여할 수 있나요?',
    options: ['가볍게 1~3시간', '꾸준히 3~6시간', '집중해서 6시간 이상', '아직 모르겠어요'],
  },
];

const PROJECT_FINDER_RESULT = {
  title: '이런 프로젝트부터 보면 좋아요',
  projectName: '스터디 일정 관리 웹서비스',
  description:
    '스터디 모집, 일정 공유, 참여 신청을 한 번에 관리하는 작은 웹서비스예요. 처음 팀 프로젝트를 시작하기 좋고, 4주 안에 결과물을 만들기 쉬운 편이에요.',
  reasons: [
    '역할 범위가 분명해요',
    '화면과 기능이 모두 포트폴리오에 남아요',
    '처음 참여자도 합류하기 좋아요',
  ],
  roles: ['프론트엔드', '백엔드', '디자이너'],
  duration: '4주',
};

const PRICING_CARDS: PricingCard[] = [
  {
    title: 'Starter',
    price: '추후 공개',
    description: '처음 시작하는 학습자를 위한 기본 실습 플랜입니다.',
    features: ['기초 강의 접근', '주차별 실습 미션', '개인 학습 기록'],
  },
  {
    title: 'Team Sprint',
    price: '추후 공개',
    description: '팀 프로젝트와 피드백 루프까지 경험하는 추천 플랜입니다.',
    features: ['팀 매칭 프로젝트', '직무별 요청사항', '대화형 코드 피드백'],
    featured: true,
  },
  {
    title: 'Portfolio Pro',
    price: '추후 공개',
    description: '완성 프로젝트를 포트폴리오로 정리하는 확장 플랜입니다.',
    features: ['배포 체크리스트', '프로젝트 회고 템플릿', '포트폴리오 가이드'],
  },
];

const CONCERN_QA_CARDS: ConcernQACard[] = [
  {
    question: '“외주를 맡기기에 부담되시나요?”',
    answerLead: '아이디어의 첫 버전은 직접 만들어볼 수 있어야 합니다.',
    answerBody:
      'HackPlay는 기획부터 구현, 배포까지 이어지는 단계별 학습을 통해 외주 없이도 내 아이디어를 직접 실험할 수 있도록 도와줍니다.',
  },
  {
    question: '“혼자 배우기엔 너무 오래 걸리나요?”',
    answerLead: '필요한 것만 순서대로 배우면 훨씬 빠르게 시작할 수 있습니다.',
    answerBody:
      '문법만 오래 공부하는 대신, 실제 서비스를 만드는 흐름에 맞춰 필요한 개념을 배우고 바로 적용할 수 있도록 구성합니다.',
  },
  {
    question: '“AI를 써도 완성이 어렵나요?”',
    answerLead: 'AI가 만든 코드를 이해하고 연결하는 힘이 필요합니다.',
    answerBody:
      'HackPlay는 AI를 단순히 사용하는 데서 끝나지 않고, 생성된 코드를 수정하고 조합해 실제 결과물로 완성하는 경험을 제공합니다.',
  },
];

const WEB_PRODUCTION_FLOW_STEPS: WebProductionFlowStep[] = [
  {
    id: 'planning',
    step: '01',
    label: '기획',
    title: '아이디어를 서비스 구조로 정리합니다',
    description: '누가, 어떤 문제를, 어떤 기능으로 해결할지 작은 서비스 단위로 좁힙니다.',
    detailTitle: '만들기 전에 방향을 먼저 고정합니다',
    details: ['사용자와 문제 정의', '핵심 기능과 우선순위 정리', 'AI에게 전달할 요구사항 작성'],
    icon: BookOpenText,
    offsetX: '0rem',
    offsetY: '-15.25rem',
    detailClassName: 'xl:left-full xl:top-0 xl:ml-4 xl:-translate-y-[3.5rem]',
  },
  {
    id: 'design',
    step: '02',
    label: '디자인',
    title: '사용자가 보는 화면 흐름을 잡습니다',
    description: '첫 화면부터 주요 행동까지 자연스럽게 이어지는 화면 구조를 설계합니다.',
    detailTitle: '사용자가 헤매지 않는 화면을 만듭니다',
    details: [
      '주요 화면과 이동 경로 구성',
      '버튼, 입력 폼, 카드 배치',
      '모바일과 데스크톱 화면 기준 정리',
    ],
    icon: PenLine,
    offsetX: '14.5rem',
    offsetY: '-4.7rem',
    detailClassName: 'xl:left-full xl:top-1/2 xl:ml-4 xl:-translate-y-1/2',
  },
  {
    id: 'frontend',
    step: '03',
    label: '프론트',
    title: '클릭 가능한 웹 화면을 구현합니다',
    description: '컴포넌트, 상태, 입력, 버튼 동작을 연결해 실제로 만질 수 있는 화면을 만듭니다.',
    detailTitle: '디자인이 실제 웹 화면으로 바뀝니다',
    details: ['React 컴포넌트 구성', '사용자 입력과 상태 처리', 'AI 생성 코드 수정과 조합'],
    icon: Code2,
    offsetX: '8.95rem',
    offsetY: '12.35rem',
    detailClassName: 'xl:left-full xl:top-1/2 xl:ml-4 xl:-translate-y-1/2',
  },
  {
    id: 'backend',
    step: '04',
    label: '백엔드',
    title: '데이터와 핵심 기능을 연결합니다',
    description: '저장, 조회, 신청, 로그인처럼 서비스 뒤에서 움직이는 동작을 이어 붙입니다.',
    detailTitle: '화면 뒤의 서비스 동작을 완성합니다',
    details: ['API 요청과 응답 흐름 이해', '데이터 저장 구조 확인', '권한, 오류, 빈 상태 처리'],
    icon: GitBranch,
    offsetX: '-8.95rem',
    offsetY: '12.35rem',
    detailClassName: 'xl:left-full xl:top-1/2 xl:ml-4 xl:-translate-y-1/2',
  },
  {
    id: 'operation',
    step: '05',
    label: '배포 및 운영',
    title: '접속 가능한 서비스로 공개합니다',
    description: '배포 링크를 만들고, 사용자의 피드백을 받아 다음 개선으로 이어갑니다.',
    detailTitle: '결과물이 실제 서비스 경험으로 남습니다',
    details: ['배포 전 체크리스트 확인', '공유 가능한 URL 만들기', '피드백 기반 개선 항목 정리'],
    icon: MonitorPlay,
    offsetX: '-14.5rem',
    offsetY: '-4.7rem',
    detailClassName: 'xl:left-full xl:top-1/2 xl:ml-4 xl:-translate-y-1/2',
  },
];

const SectionHeading = ({
  eyebrow,
  title,
  description,
  icon: Icon,
  tone = 'light',
}: SectionHeadingProps) => {
  const isDark = tone === 'dark';

  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
      <div
        className={`mb-5 flex h-11 w-11 items-center justify-center rounded-full border shadow-1 ${
          isDark
            ? 'border-white/10 bg-white/10 text-white'
            : 'border-blue-100 bg-white text-primary-500'
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </div>
      <p
        className={`mb-3 text-sm font-bold uppercase tracking-[0.14em] ${
          isDark ? 'text-sky-200' : 'text-primary-500'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`text-2xl font-extrabold leading-tight sm:text-3xl lg:text-[2.625rem] ${
          isDark ? 'text-white' : 'text-neutral-900'
        }`}
      >
        {title}
      </h2>
      <p
        className={`mt-4 max-w-2xl text-base leading-relaxed sm:text-lg ${
          isDark ? 'text-white/65' : 'text-neutral-500'
        }`}
      >
        {description}
      </p>
    </div>
  );
};

const MainPage = () => {
  const [projectFinderAnswers, setProjectFinderAnswers] = useState<string[]>([]);
  const [activeFlowStepId, setActiveFlowStepId] = useState<string | null>(null);
  const currentProjectFinderStep = PROJECT_FINDER_STEPS[projectFinderAnswers.length];
  const isProjectFinderComplete = projectFinderAnswers.length === PROJECT_FINDER_STEPS.length;
  const projectFinderProgress = Math.round(
    (projectFinderAnswers.length / PROJECT_FINDER_STEPS.length) * 100,
  );

  const handleHackathonClick = () => {
    document.getElementById('hackathon')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleLearningClick = () => {
    document.getElementById('learning')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleProjectFinderSelect = (option: string) => {
    if (isProjectFinderComplete) return;

    setProjectFinderAnswers((answers) => [...answers, option]);
  };

  const handleProjectFinderReset = () => {
    setProjectFinderAnswers([]);
  };

  return (
    <div className="-mx-[15px] -mt-[4.125rem] overflow-hidden bg-white text-neutral-900 lg:-mx-5 lg:-mt-24">
      <section className="relative flex min-h-[34rem] items-center justify-center overflow-hidden bg-neutral-950 px-5 pt-[4.125rem] text-center text-white sm:min-h-[40rem] lg:min-h-[43rem] lg:pt-24">
        <img
          src={MainCharacterGroup}
          alt="해커플레이 학습자들이 함께 프로젝트를 준비하는 모습"
          className="main-hero-visual absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#102a5e]/40 via-[#182451]/45 to-[#463360]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_34%),linear-gradient(90deg,rgba(12,31,70,0.55),rgba(43,36,84,0.12),rgba(95,54,75,0.35))]" />

        <Sparkles className="main-float-slow absolute left-[20%] top-[36%] h-10 w-10 text-sky-200 drop-shadow-lg sm:left-[27%]" />
        <Sparkles className="main-float-delay absolute right-[19%] top-[40%] h-9 w-9 text-pink-300 drop-shadow-lg sm:right-[26%]" />
        <Sparkles className="main-float-soft absolute left-[28%] top-[43%] hidden h-8 w-8 text-cyan-300 drop-shadow-lg sm:block" />

        <div className="relative z-base mx-auto flex max-w-4xl flex-col items-center px-3">
          <p className="mb-4 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
            아이디어를 웹서비스로
          </p>
          <h1 className="main-title-glow text-[3rem] font-black leading-none tracking-[0.24em] drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)] sm:text-[4.8rem] lg:text-[6rem]">
            HACKPLAY
          </h1>
          <h2 className="mt-7 break-keep text-2xl font-extrabold leading-tight text-white sm:text-4xl lg:text-[2.75rem]">
            아이디어만 있다면,
            <br />첫 웹서비스는 직접 만들 수 있습니다.
          </h2>
          <p className="mt-5 max-w-2xl break-keep text-base font-medium leading-relaxed text-white/85 sm:text-xl">
            HackPlay에서 웹 제작의 흐름을 익히고, AI와 함께 아이디어를 개발해 해커톤에서 배포까지
            도전해보세요.
          </p>
          <div className="mt-6 flex max-w-2xl flex-wrap justify-center gap-2.5">
            {[
              '1~2인 참가 가능',
              'AI 활용 개발',
              '배포까지 진행',
              '랭킹 제공',
              '처음이어도 시작 가능',
            ].map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/18 bg-white/[0.12] px-3 py-1.5 text-xs font-semibold text-white/82 backdrop-blur-md sm:text-sm"
              >
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleHackathonClick}
              className="main-cta-shine inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary-500 px-7 text-sm font-bold text-white shadow-[0_14px_30px_rgba(0,125,241,0.32)] transition-colors hover:bg-primary-600 sm:h-14 sm:px-8 sm:text-base"
            >
              해커톤 참가하기
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleLearningClick}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.12] px-7 text-sm font-bold text-white backdrop-blur-md transition-colors hover:bg-white/20 sm:h-14 sm:px-8 sm:text-base"
            >
              단계별로 준비하기
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fbff] to-white px-5 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-20 h-64 w-[54rem] -translate-x-1/2 rounded-full bg-primary-500/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-8 h-72 w-72 rounded-full bg-[#86e8d5]/25 blur-3xl" />

        <div className="relative mx-auto max-w-3xl text-center">
          <div className="main-icon-bob mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-primary-500 shadow-sm">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="break-keep text-3xl font-black leading-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            좋은 아이디어는 있는데,
            <br />
            개발 앞에서 멈춘 적 있나요?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl break-keep text-base leading-relaxed text-neutral-500 sm:text-lg">
            외주를 맡기기엔 부담스럽고, 혼자 배우기엔 오래 걸리고, AI를 써도 어디서부터 고쳐야 할지
            막막할 때가 있습니다.
            <span className="mt-2 block">HackPlay는 그 고민에 학습과 실전으로 답합니다.</span>
          </p>
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {CONCERN_QA_CARDS.map((card) => (
            <div key={card.question} className="flex h-full flex-col">
              <div className="relative z-base mx-2 mb-5 rounded-[1.25rem] bg-[#eaf5ff] px-5 py-4 text-left shadow-[inset_0_0_0_1px_rgba(0,125,241,0.08),0_12px_34px_rgba(0,72,160,0.07)] after:absolute after:-bottom-2 after:left-8 after:h-4 after:w-4 after:rotate-45 after:rounded-[0.25rem] after:bg-[#eaf5ff] after:content-[''] sm:mx-3">
                <span className="mb-2 block text-xs font-black uppercase text-primary-500">Q.</span>
                <h3 className="relative break-keep text-lg font-extrabold leading-snug text-[#163f68] sm:text-xl">
                  {card.question}
                </h3>
              </div>

              <article className="main-card-lift flex flex-1 flex-col rounded-[1.5rem] border border-blue-100/80 bg-white p-6 text-left shadow-[0_18px_60px_rgba(0,72,160,0.09)] sm:p-7">
                <div className="flex flex-1 flex-col">
                  <span className="mb-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary-500 text-xs font-black text-white">
                    A.
                  </span>
                  <p className="break-keep text-base font-extrabold leading-relaxed text-neutral-900">
                    {card.answerLead}
                  </p>
                  <p className="mt-3 break-keep text-base leading-relaxed text-neutral-500">
                    {card.answerBody}
                  </p>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl rounded-[1.5rem] border border-blue-100 bg-white/85 px-6 py-7 text-center shadow-[0_18px_55px_rgba(0,72,160,0.08)] backdrop-blur sm:px-10 lg:mt-12">
          <p className="break-keep text-lg font-extrabold leading-relaxed text-neutral-900 sm:text-xl">
            HackPlay는 학습과 실전을 따로 보지 않습니다.
            <br />
            배우는 이유는 만들기 위해서이고, 만드는 이유는 배포하기 위해서입니다.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f6fbff] to-[#eef8ff] px-5 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-500/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-12 h-72 w-72 rounded-full bg-[#86e8d5]/25 blur-3xl" />

        <div className="relative">
          <SectionHeading
            eyebrow="How It Works"
            title="HackPlay는 준비와 실전이 연결되어 있습니다"
            description="처음이라면 웹 제작의 구조를 먼저 익히고, 아이디어가 있다면 바로 해커톤에서 만들어보세요."
            icon={Rocket}
          />
        </div>

        <div className="relative mx-auto mt-12 max-w-7xl lg:mt-16">
          <div className="absolute left-[12%] right-[12%] top-8 hidden h-px bg-blue-100 md:block" />
          <div className="grid gap-5 md:grid-cols-4">
            {[
              {
                title: 'Learn',
                description: '웹서비스가 어떤 구조로 만들어지는지 단계별로 익힙니다.',
                icon: BookOpenCheck,
              },
              {
                title: 'Make',
                description: '아이디어를 정리하고 AI와 함께 첫 버전을 구현합니다.',
                icon: Code2,
              },
              {
                title: 'deploy',
                description: '완성한 결과물을 실제 접속 가능한 웹으로 올립니다.',
                icon: MonitorPlay,
              },
              {
                title: 'Compete',
                description: '해커톤에 제출하고 랭킹과 피드백을 확인합니다.',
                icon: BadgeCheck,
              },
            ].map((step, index, steps) => {
              const Icon = step.icon;
              const stepNumber = String(index + 1).padStart(2, '0');

              return (
                <article
                  key={step.title}
                  className="main-card-lift relative overflow-hidden rounded-[1.5rem] border border-blue-100/80 bg-white p-6 shadow-[0_18px_60px_rgba(0,72,160,0.09)] md:p-7"
                >
                  {index < steps.length - 1 ? (
                    <div className="absolute bottom-[-1.25rem] left-[2.2rem] top-[5.6rem] w-px bg-blue-100 md:hidden" />
                  ) : null}
                  <div className="relative flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-white shadow-[0_14px_30px_rgba(0,125,241,0.22)]">
                      <Icon className="h-7 w-7" strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-extrabold text-primary-500">
                        STEP {stepNumber}
                      </span>
                      <h3 className="mt-2 text-2xl font-black text-neutral-900">{step.title}</h3>
                    </div>
                  </div>
                  <p className="relative mt-5 break-keep text-base leading-relaxed text-neutral-500">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto mt-10 max-w-4xl rounded-[1.5rem] border border-blue-100 bg-white px-6 py-7 text-center shadow-[0_18px_55px_rgba(0,72,160,0.09)] sm:px-10 lg:mt-12">
          <p className="break-keep text-lg font-extrabold leading-relaxed text-neutral-900 sm:text-xl">
            단계별 학습은 해커톤을 위한 준비 과정이고, 해커톤은 학습한 내용을 실제 결과물로 증명하는
            무대입니다.
          </p>
        </div>
      </section>

      <section
        id="learning"
        className="relative scroll-mt-24 overflow-x-clip overflow-y-visible bg-gradient-to-b from-white via-[#f8fbff] to-[#eef8ff] px-5 py-20 lg:px-10 lg:py-28"
      >
        <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-[68rem] -translate-x-1/2 rounded-full bg-primary-500/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-8 h-72 w-72 rounded-full bg-[#86e8d5]/24 blur-3xl" />

        <div className="relative">
          <SectionHeading
            eyebrow="Step Learning"
            title="웹 제작은 하나의 흐름으로 이어집니다"
            description="기획에서 디자인, 프론트, 백엔드, 배포 및 운영까지 이어지는 제작 흐름을 따라 필요한 개념을 배우고 바로 적용합니다."
            icon={BookOpenText}
          />
        </div>

        <div className="relative mx-auto mt-12 max-w-7xl lg:mt-16">
          <div className="relative grid gap-5 xl:h-[48rem] xl:block">
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[30.5rem] w-[30.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-primary-500/25 bg-white/35 xl:block" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[18.5rem] w-[18.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-100 bg-white/65 shadow-[0_18px_60px_rgba(0,72,160,0.08)] backdrop-blur xl:flex xl:flex-col xl:items-center xl:justify-center xl:text-center">
              <span className="text-xs font-black uppercase tracking-[0.18em] text-primary-500">
                Web Flow
              </span>
              <p className="mt-3 max-w-48 break-keep text-2xl font-black leading-tight text-neutral-900">
                기획에서 운영까지 이어지는 제작 흐름
              </p>
            </div>

            <svg
              aria-hidden="true"
              viewBox="0 0 400 400"
              className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden h-[30.5rem] w-[30.5rem] -translate-x-1/2 -translate-y-1/2 xl:block"
              fill="none"
            >
              <defs>
                <marker
                  id="web-flow-arrowhead"
                  markerHeight="12"
                  markerWidth="12"
                  orient="auto"
                  refX="9.5"
                  refY="6"
                >
                  <path
                    d="M1.5 1.5L9.5 6L1.5 10.5"
                    stroke="#007df1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.4"
                  />
                </marker>
              </defs>
              {[
                'M214 20 A180 180 0 0 1 346 132',
                'M379 202 A180 180 0 0 1 278 362',
                'M229 374 A180 180 0 0 1 84 329',
                'M37 242 A180 180 0 0 1 54 108',
                'M93 64 A180 180 0 0 1 178 22',
              ].map((path) => (
                <g key={path}>
                  <path
                    d={path}
                    stroke="white"
                    strokeLinecap="round"
                    strokeWidth="7"
                    opacity="0.78"
                  />
                  <path
                    d={path}
                    markerEnd="url(#web-flow-arrowhead)"
                    stroke="#007df1"
                    strokeDasharray="11 8"
                    strokeLinecap="round"
                    strokeWidth="3"
                    opacity="0.82"
                  />
                </g>
              ))}
            </svg>

            {WEB_PRODUCTION_FLOW_STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeFlowStepId === step.id;
              const flowStepStyle = {
                '--flow-x': step.offsetX,
                '--flow-y': step.offsetY,
              } as CSSProperties;

              return (
                <div
                  key={step.id}
                  style={flowStepStyle}
                  className={`relative xl:absolute xl:left-1/2 xl:top-1/2 xl:w-64 xl:[transform:translate(var(--flow-x),var(--flow-y))] ${
                    isActive ? 'z-[6]' : 'z-[2]'
                  }`}
                >
                  <div className="xl:-translate-x-1/2 xl:-translate-y-1/2">
                    <button
                      type="button"
                      aria-expanded={isActive}
                      aria-pressed={isActive}
                      onClick={() =>
                        setActiveFlowStepId((currentStepId) =>
                          currentStepId === step.id ? null : step.id,
                        )
                      }
                      className={`main-card-lift flex w-full flex-col items-start rounded-[1.5rem] border p-5 text-left shadow-[0_18px_60px_rgba(0,72,160,0.09)] transition-colors ${
                        isActive
                          ? 'border-primary-500 bg-white'
                          : 'border-blue-100/80 bg-white/95 hover:border-primary-500/45'
                      }`}
                    >
                      <div className="flex w-full items-center gap-4">
                        <div
                          className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-[0_14px_30px_rgba(0,125,241,0.2)] ${
                            isActive ? 'bg-primary-500 text-white' : 'bg-blue-50 text-primary-500'
                          }`}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.8} />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-black uppercase tracking-[0.16em] text-neutral-300">
                            Step {step.step}
                          </span>
                          <h3 className="mt-1 text-2xl font-black text-neutral-900">
                            {step.label}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-5 break-keep text-base font-extrabold leading-snug text-neutral-900">
                        {step.title}
                      </p>
                      <p className="mt-3 break-keep text-sm leading-relaxed text-neutral-500">
                        {step.description}
                      </p>
                    </button>

                    {isActive ? (
                      <aside
                        className={`main-project-finder-result mt-3 rounded-[1.25rem] border border-primary-500/20 bg-white p-5 text-left shadow-[0_22px_70px_rgba(0,72,160,0.16)] xl:absolute xl:z-[7] xl:mt-0 xl:w-64 ${step.detailClassName}`}
                      >
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-primary-500">
                          {step.label} 상세
                        </p>
                        <h4 className="mt-3 break-keep text-lg font-black leading-snug text-neutral-900">
                          {step.detailTitle}
                        </h4>
                        <div className="mt-4 space-y-3">
                          {step.details.map((detail) => (
                            <div
                              key={detail}
                              className="flex gap-2.5 text-sm font-semibold text-neutral-600"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" />
                              <span className="break-keep leading-relaxed">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </aside>
                    ) : null}
                  </div>

                  {index < WEB_PRODUCTION_FLOW_STEPS.length - 1 ? (
                    <div className="mt-5 flex justify-center xl:hidden" aria-hidden="true">
                      <span className="relative h-12 w-px rounded-full bg-gradient-to-b from-primary-500/20 to-primary-500/70 after:absolute after:bottom-0 after:left-1/2 after:h-3 after:w-3 after:-translate-x-1/2 after:translate-y-0.5 after:rotate-45 after:border-b-2 after:border-r-2 after:border-primary-500/70 after:content-['']" />
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mt-10 flex justify-center lg:mt-12">
          <Link
            to={ROUTES.COURSES.ROOT}
            className="main-cta-shine inline-flex h-13 items-center justify-center gap-2 rounded-full bg-primary-500 px-7 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(0,125,241,0.28)] transition-colors hover:bg-primary-600 sm:h-14 sm:px-8 sm:text-base"
          >
            단계별 학습 시작하기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section
        id="hackathon"
        className="relative scroll-mt-24 overflow-hidden bg-gradient-to-b from-[#eef8ff] via-white to-[#f7fbff] px-5 py-20 lg:px-10 lg:py-28"
      >
        <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-primary-500/[0.1] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-16 h-72 w-72 rounded-full bg-[#86e8d5]/25 blur-3xl" />

        <div className="relative">
          <SectionHeading
            eyebrow="Hackathon"
            title="좋은 아이디어가 있다면, 해커톤에서 바로 만들어보세요"
            description="1~2인으로 참가해 AI를 활용해 개발하고, 배포 URL을 제출해 결과물로 겨뤄보세요."
            icon={Rocket}
          />
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl items-start gap-7 lg:mt-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                { title: '아이디어 등록', icon: BookOpenText },
                { title: '1~2인 참가', icon: UsersRound },
                { title: 'AI와 함께 개발', icon: Sparkles },
                { title: '웹으로 배포', icon: MonitorPlay },
                { title: '결과물 제출', icon: FileText },
                { title: '랭킹 공개', icon: BadgeCheck },
              ].map((step, index) => {
                const Icon = step.icon;

                return (
                  <div
                    key={step.title}
                    className="main-card-lift flex items-center gap-4 rounded-[1.25rem] border border-blue-100 bg-white p-4 shadow-[0_14px_45px_rgba(0,72,160,0.08)]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-primary-500">
                      <Icon className="h-5 w-5" strokeWidth={1.9} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-neutral-300">
                        Step {index + 1}
                      </p>
                      <h3 className="mt-1 text-lg font-extrabold text-neutral-900">{step.title}</h3>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-7 rounded-[1.5rem] border border-blue-100 bg-white/90 px-6 py-6 shadow-[0_18px_55px_rgba(0,72,160,0.08)] backdrop-blur sm:px-8">
              <p className="break-keep text-xl font-black leading-relaxed text-neutral-900">
                완벽한 코드보다 중요한 건, 실제로 접속 가능한 첫 결과물입니다.
              </p>
            </div>
          </div>

          <article className="main-card-lift overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-[0_28px_90px_rgba(0,72,160,0.13)]">
            <div className="bg-gradient-to-r from-primary-500 to-[#36cfe0] px-7 py-6 text-white">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full bg-white/18 px-3 py-1.5 text-sm font-extrabold backdrop-blur">
                  모집 중
                </span>
                <span className="rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-primary-500">
                  마감 D-14
                </span>
              </div>
              <h3 className="mt-7 break-keep text-3xl font-black leading-tight">
                AI 웹서비스 4주 챌린지
              </h3>
              <p className="mt-4 break-keep text-base font-medium leading-relaxed text-white/84">
                일상 속 불편함을 해결하는 작은 웹서비스를 AI와 함께 만들고 배포하는 해커톤입니다.
              </p>
            </div>

            <div className="p-7">
              <dl className="divide-y divide-blue-100 rounded-[1.25rem] border border-blue-100 bg-blue-50/45">
                {[
                  ['참가 방식', '1~2인'],
                  ['기간', '4주'],
                  ['마감일', '모집 마감 D-14'],
                  ['제출', '배포 URL + 소개 이미지'],
                  ['평가', '완성도, 아이디어, 사용성'],
                  ['상태', '모집 중'],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[5.5rem_1fr] gap-3 px-4 py-3 text-sm sm:grid-cols-[6.5rem_1fr]"
                  >
                    <dt className="font-extrabold text-primary-500">{label}</dt>
                    <dd className="break-keep font-bold text-neutral-700">{value}</dd>
                  </div>
                ))}
              </dl>

              <button
                type="button"
                className="main-cta-shine mt-6 inline-flex h-13 w-full items-center justify-center gap-2 rounded-full bg-primary-500 px-6 text-sm font-extrabold text-white shadow-[0_14px_30px_rgba(0,125,241,0.28)] transition-colors hover:bg-primary-600 sm:h-14 sm:text-base"
              >
                해커톤 시작하기
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f7fbff] to-[#eef8ff] px-5 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute -right-28 top-16 h-80 w-80 rounded-full bg-primary-500/[0.1] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-[#86e8d5]/24 blur-3xl" />

        <div className="relative">
          <SectionHeading
            eyebrow="Result Gallery"
            title="완성한 결과물은 기록으로 남습니다"
            description="해커톤이 끝나면 프로젝트는 결과물 갤러리에 공개되고, 랭킹과 배포 링크를 포트폴리오처럼 활용할 수 있습니다."
            icon={BadgeCheck}
          />
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl gap-5 lg:mt-16 lg:grid-cols-3">
          {[
            {
              name: '동네 러닝 크루 매칭',
              description: '가까운 지역의 러닝 모임을 찾고 참여 신청할 수 있는 웹서비스',
              rank: '1위',
              members: '2인',
              status: '배포 완료',
              tag: 'AI Vibe Coding',
              gradient: 'from-[#007df1] via-[#36cfe0] to-[#87f0d6]',
            },
            {
              name: '스터디 일정 관리 툴',
              description: '스터디 모집, 일정 공유, 참여 신청을 한 번에 관리하는 서비스',
              rank: '2위',
              members: '1인',
              status: '배포 완료',
              tag: '4주 챌린지',
              gradient: 'from-[#5b7cfa] via-[#28b8f6] to-[#99e6ff]',
            },
            {
              name: '작은 가게 예약 관리',
              description: '소규모 매장의 예약 시간과 고객 신청을 관리하는 웹서비스',
              rank: '3위',
              members: '2인',
              status: '배포 완료',
              tag: '생활 서비스',
              gradient: 'from-[#11a7b8] via-[#1cc7a7] to-[#b7f3d0]',
            },
          ].map((result) => (
            <article
              key={result.name}
              className="main-card-lift group overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white shadow-[0_18px_60px_rgba(0,72,160,0.1)]"
            >
              <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${result.gradient}`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.45),transparent_28%),radial-gradient(circle_at_78%_70%,rgba(255,255,255,0.28),transparent_24%)]" />
                <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white px-3 py-1.5 text-sm font-black text-primary-500 shadow-sm">
                    {result.rank}
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-black text-emerald-600 shadow-sm">
                    {result.status}
                  </span>
                </div>
                <div className="absolute bottom-5 left-5 right-5 rounded-[1.25rem] bg-white/18 p-4 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-[1.02]">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/75">
                    Deployed Project
                  </p>
                  <p className="mt-2 truncate text-lg font-black">hackplay.app/result</p>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-extrabold text-primary-500">
                    {result.tag}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-extrabold text-neutral-400">
                    <UsersRound className="h-4 w-4" />
                    {result.members}
                  </span>
                </div>

                <h3 className="break-keep text-2xl font-black leading-tight text-neutral-900">
                  {result.name}
                </h3>
                <p className="mt-4 min-h-16 break-keep text-base leading-relaxed text-neutral-500">
                  {result.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-neutral-50 p-4">
                    <p className="text-xs font-bold text-neutral-400">랭킹</p>
                    <p className="mt-1 text-xl font-black text-primary-500">{result.rank}</p>
                  </div>
                  <div className="rounded-2xl bg-neutral-50 p-4">
                    <p className="text-xs font-bold text-neutral-400">상태</p>
                    <p className="mt-1 text-xl font-black text-neutral-900">{result.status}</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-primary-500 bg-white px-5 text-sm font-extrabold text-primary-500 transition-colors hover:bg-blue-50"
                >
                  결과물 보기
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-[#f7fbff] via-white to-[#f4faf7] px-5 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-primary-500/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -right-28 bottom-20 h-80 w-80 rounded-full bg-[#86e8d5]/30 blur-3xl" />

        <div className="relative">
          <SectionHeading
            eyebrow="Project Finder"
            title="딱 30초, 나에게 맞는 프로젝트부터 골라볼까요?"
            description="역할, 관심 분야, 참여 가능 시간만 선택하면 지금 보기 좋은 프로젝트를 보여드릴게요."
            icon={MessageSquareText}
          />
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl gap-6 lg:mt-16 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[1.75rem] border border-blue-100 bg-white/92 p-5 shadow-[0_24px_80px_rgba(15,35,80,0.10)] backdrop-blur md:p-7">
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between text-sm font-bold text-neutral-500">
                <span>프로젝트 찾기 테스트</span>
                <span>{projectFinderProgress}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-blue-50">
                <div
                  className="h-full rounded-full bg-primary-500 transition-all duration-500 ease-out"
                  style={{ width: `${projectFinderProgress}%` }}
                />
              </div>
            </div>

            <div className="min-h-[30rem] space-y-5">
              {PROJECT_FINDER_STEPS.map((step, index) => {
                const answer = projectFinderAnswers[index];
                const shouldShowStep = index <= projectFinderAnswers.length;
                const isCurrentStep =
                  index === projectFinderAnswers.length && !isProjectFinderComplete;

                if (!shouldShowStep) return null;

                return (
                  <div key={step.message} className="space-y-3">
                    <div className="main-chat-message flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white shadow-sm">
                        <MessageSquareText className="h-4 w-4" />
                      </div>
                      <div className="max-w-[42rem] rounded-[1.25rem] rounded-tl-md bg-blue-50 px-5 py-4 text-sm font-semibold leading-relaxed text-neutral-700 sm:text-base">
                        {step.message}
                      </div>
                    </div>

                    {isCurrentStep ? (
                      <div className="main-chat-message ml-12 flex flex-wrap gap-2.5">
                        {currentProjectFinderStep.options.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => handleProjectFinderSelect(option)}
                            className="rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-bold text-neutral-700 shadow-sm transition-colors hover:border-primary-500 hover:bg-blue-50 hover:text-primary-500"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    ) : null}

                    {answer ? (
                      <div className="main-chat-message flex justify-end">
                        <div className="max-w-[80%] rounded-[1.25rem] rounded-tr-md bg-primary-500 px-5 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(0,125,241,0.20)]">
                          {answer}
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}

              {isProjectFinderComplete ? (
                <div className="main-chat-message flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-500 text-white shadow-sm">
                    <CheckCircle2 className="h-4 w-4" />
                  </div>
                  <div className="rounded-[1.25rem] rounded-tl-md bg-blue-50 px-5 py-4 text-sm font-semibold leading-relaxed text-neutral-700 sm:text-base">
                    좋아요. 지금 고른 조건으로 처음 보기 좋은 프로젝트를 오른쪽에 정리했어요.
                  </div>
                </div>
              ) : null}
            </div>
          </article>

          <aside className="min-h-[30rem] rounded-[1.75rem] border border-blue-100 bg-white/80 p-5 shadow-[0_24px_80px_rgba(15,35,80,0.10)] backdrop-blur md:p-7">
            {isProjectFinderComplete ? (
              <div className="main-project-finder-result h-full rounded-[1.5rem] bg-gradient-to-br from-white via-white to-blue-50 p-6 shadow-sm">
                <p className="text-sm font-bold uppercase tracking-[0.14em] text-primary-500">
                  {PROJECT_FINDER_RESULT.title}
                </p>
                <h3 className="mt-4 text-3xl font-extrabold leading-tight text-neutral-900">
                  {PROJECT_FINDER_RESULT.projectName}
                </h3>
                <p className="mt-4 break-keep text-base leading-relaxed text-neutral-500">
                  {PROJECT_FINDER_RESULT.description}
                </p>

                <div className="mt-6 rounded-[1.25rem] border border-blue-100 bg-white p-5">
                  <h4 className="font-extrabold text-neutral-900">추천 이유</h4>
                  <div className="mt-4 space-y-3">
                    {PROJECT_FINDER_RESULT.reasons.map((reason) => (
                      <div
                        key={reason}
                        className="flex items-center gap-2 text-sm font-semibold text-neutral-600"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-500" />
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] border border-blue-100 bg-white p-4">
                    <p className="text-sm font-extrabold text-neutral-900">모집 역할</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {PROJECT_FINDER_RESULT.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-bold text-primary-500"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.25rem] border border-blue-100 bg-white p-4">
                    <p className="text-sm font-extrabold text-neutral-900">예상 기간</p>
                    <p className="mt-3 text-2xl font-extrabold text-primary-500">
                      {PROJECT_FINDER_RESULT.duration}
                    </p>
                  </div>
                </div>

                <div className="mt-7 flex justify-center">
                  <button
                    type="button"
                    onClick={handleProjectFinderReset}
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-blue-100 bg-white px-5 text-sm font-extrabold text-primary-500 transition-colors hover:bg-blue-50"
                  >
                    다시 골라보기
                    <RotateCcw className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-[1.5rem] border border-dashed border-blue-200 bg-blue-50/70 p-8 text-center">
                <div className="main-icon-bob mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-primary-500 shadow-sm">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-extrabold text-neutral-900">
                  세 가지만 고르면 결과가 보여요
                </h3>
                <p className="mt-3 max-w-sm break-keep text-base leading-relaxed text-neutral-500">
                  부담 없이 눌러보세요. 고른 내용은 언제든 다시 바꿀 수 있어요.
                </p>
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="hidden">
        <div className="absolute inset-x-0 top-0 h-52 bg-gradient-to-b from-white to-transparent" />
        <div className="pointer-events-none absolute -left-28 top-28 h-72 w-72 rounded-full bg-[#86e8d5]/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-20 h-80 w-80 rounded-full bg-primary-500/12 blur-3xl" />

        <div className="relative">
          <SectionHeading
            eyebrow="Interactive Quiz"
            title="퀴즈는 오답까지 바로 잡아줘요"
            description="퀴즈는 틀린 문제, 선택한 답, 다시 풀기 흐름을 모달로 정리해 실습 내용을 놓치지 않게 만듭니다."
            icon={MessageSquareText}
          />
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl items-center gap-8 lg:mt-16 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {QUIZ_FEATURES.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="main-card-lift rounded-[1.25rem] border border-white bg-white/90 p-5 shadow-[0_16px_45px_rgba(31,67,94,0.08)] backdrop-blur"
                >
                  <div className="flex gap-4">
                    <div className="main-icon-bob flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-extrabold text-neutral-900">{feature.title}</h3>
                      <p className="mt-2 break-keep text-sm leading-relaxed text-neutral-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="main-editor-glow relative h-[37rem] overflow-visible rounded-[2rem] border border-white bg-[#eef8f4] p-4 shadow-[0_28px_90px_rgba(30,62,80,0.18)] sm:h-[38rem] sm:p-6 lg:h-[36rem]">
            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-neutral-200 bg-white/80 p-2 text-sm font-bold text-neutral-700 shadow-sm">
              <div className="flex h-12 items-center justify-center gap-2 rounded-xl">
                <BookOpenText className="h-4 w-4" />
                주차 가이드
              </div>
              <div className="flex h-12 items-center justify-center gap-2 rounded-xl">
                <MessageSquareText className="h-4 w-4" />
                학습 내용
              </div>
              <div className="flex h-12 items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white">
                <PenLine className="h-4 w-4" />
                퀴즈
              </div>
            </div>

            <div className="mt-5 max-h-[24rem] space-y-4 overflow-hidden pb-6">
              {[4, 5].map((number) => (
                <div key={number} className="rounded-[1.25rem] bg-white/[0.82] p-5 shadow-sm">
                  <p className="flex items-start gap-4 text-lg font-extrabold text-neutral-700">
                    <span className="text-2xl">Q.</span>
                    <span>{number}. .git 디렉토리에 대한 설명으로 올바른 것은?</span>
                  </p>
                  <div className="mt-5 space-y-3 pl-1 text-base text-neutral-600">
                    {[
                      '직접 수정해야 하는 설정 파일이다',
                      '빌드 결과물이 저장된다',
                      '프로젝트의 모든 기록과 변경 이력을 담는다',
                      '배포 환경 설정 파일이 있다',
                    ].map((answer, index) => (
                      <div key={answer} className="flex items-center gap-3">
                        <span
                          className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold ${
                            index === 3 && number === 5
                              ? 'main-answer-highlight border-primary-500 bg-primary-500/[0.18] text-primary-500'
                              : 'border-neutral-300 text-neutral-500'
                          }`}
                        >
                          {index + 1}
                        </span>
                        <span>{answer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 rounded-[2rem] bg-neutral-950/42 backdrop-blur-[1px]" />
            <div className="main-quiz-modal-drift absolute left-1/2 top-1/2 w-[min(92%,29rem)] -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-[2rem] bg-white shadow-[0_28px_90px_rgba(0,0,0,0.28)]">
              <div className="relative overflow-hidden rounded-[2rem] bg-white">
                <div className="relative px-6 pb-7 pt-14 text-center sm:px-11 sm:pb-9 sm:pt-16">
                  <button
                    type="button"
                    aria-label="닫기"
                    className="absolute right-7 top-7 flex h-8 w-8 items-center justify-center rounded-full text-neutral-400"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <div className="main-pulse-ring mx-auto flex h-20 w-20 rotate-[-14deg] items-center justify-center rounded-[1.5rem] bg-red-50">
                    <XCircle className="h-10 w-10 rotate-[14deg] text-red-500" />
                  </div>
                  <h3 className="mt-8 text-2xl font-extrabold text-neutral-800 sm:mt-9 sm:text-3xl">
                    다시 확인해볼까요?
                  </h3>
                  <p className="mt-4 text-base font-semibold text-neutral-500 sm:mt-5 sm:text-lg">
                    1문제를 다시 풀어보면 좋아요.
                  </p>
                  <div className="mt-7 rounded-[1.25rem] bg-white px-5 py-5 text-left shadow-[0_16px_45px_rgba(15,35,80,0.13)] sm:mt-8">
                    <p className="flex gap-3 text-sm font-extrabold text-neutral-700">
                      <span>Q.</span>
                      <span>.git 디렉토리에 대한 설명으로 올바른 것은?</span>
                    </p>
                    <p className="mt-4 flex items-center gap-3 text-sm font-bold text-red-500">
                      <X className="h-5 w-5 text-neutral-500" />
                      4. 배포 환경 설정 파일이 있다
                    </p>
                  </div>
                  <div className="mt-7 flex flex-col items-end gap-3 sm:mt-8">
                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary-500 px-6 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(0,125,241,0.28)] sm:px-7"
                    >
                      답안 보기
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-primary-500 px-6 text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(0,125,241,0.28)] sm:px-7"
                    >
                      틀린 문제 다시 풀기
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex h-18 items-center justify-center gap-2 border-t border-neutral-100 text-sm font-semibold text-neutral-500 sm:h-20 sm:text-base">
                  <Home className="h-5 w-5" />
                  메인으로 돌아가기
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fbff] to-white px-5 py-20 lg:px-10 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-[64rem] -translate-x-1/2 rounded-full bg-primary-500/[0.08] blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-12 h-72 w-72 rounded-full bg-[#86e8d5]/22 blur-3xl" />

        <div className="relative">
          <SectionHeading
            eyebrow="Start Guide"
            title="지금 어디서 시작하면 좋을까요?"
            description="준비 상태에 따라 시작점은 달라도 괜찮습니다. HackPlay에서는 배우다가 만들 수 있고, 만들다가 다시 배울 수 있습니다."
            icon={BriefcaseBusiness}
          />
        </div>

        <div className="relative mx-auto mt-12 grid max-w-7xl gap-5 md:grid-cols-3 lg:mt-16">
          {[
            {
              title: '아직 웹 제작이 막막하다면',
              description: '단계별 학습에서 화면, 기능, 데이터, 배포의 흐름을 먼저 익혀보세요.',
              button: '단계별 학습으로 시작',
              icon: BookOpenCheck,
              onClick: handleLearningClick,
            },
            {
              title: '이미 만들고 싶은 아이디어가 있다면',
              description: '해커톤에 참가해 AI와 함께 첫 버전을 만들고 배포까지 도전해보세요.',
              button: '해커톤으로 시작',
              icon: Rocket,
              onClick: handleHackathonClick,
            },
            {
              title: 'AI로 만들어봤지만 자꾸 막힌다면',
              description: '필요한 부분만 학습으로 보완하고, 다시 해커톤 결과물에 적용해보세요.',
              button: '필요한 부분만 배우기',
              icon: Sparkles,
              onClick: handleLearningClick,
            },
          ].map((guide) => {
            const Icon = guide.icon;

            return (
              <article
                key={guide.title}
                className="main-card-lift group flex min-h-full flex-col rounded-[1.5rem] border border-blue-100/80 bg-white p-7 text-left shadow-[0_18px_60px_rgba(0,72,160,0.09)]"
              >
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-primary-500 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                  <Icon className="h-7 w-7" strokeWidth={1.8} />
                </div>
                <h3 className="break-keep text-2xl font-black leading-tight text-neutral-900">
                  {guide.title}
                </h3>
                <p className="mt-4 flex-1 break-keep text-base leading-relaxed text-neutral-500">
                  {guide.description}
                </p>
                <button
                  type="button"
                  onClick={guide.onClick}
                  className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-full border border-primary-500 bg-white px-5 text-sm font-extrabold text-primary-500 transition-colors hover:bg-blue-50"
                >
                  {guide.button}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </article>
            );
          })}
        </div>
      </section>

      <section
        id="pricing"
        className="scroll-mt-24 bg-gradient-to-b from-[#f6fbff] to-white px-5 py-20 lg:px-10 lg:py-28"
      >
        <SectionHeading
          eyebrow="Pricing"
          title="결제 플랜은 곧 공개됩니다"
          description="시작하기 버튼을 누르면 이 영역으로 이동합니다. 추후 학습 범위와 팀 프로젝트 옵션에 맞춰 플랜이 열릴 예정입니다."
          icon={CreditCard}
        />

        <div className="mx-auto mt-12 grid max-w-7xl gap-5 lg:mt-16 lg:grid-cols-3">
          {PRICING_CARDS.map((plan) => (
            <article
              key={plan.title}
              className={`main-card-lift relative overflow-hidden rounded-[1.5rem] border p-7 text-left shadow-[0_18px_60px_rgba(15,35,80,0.09)] ${
                plan.featured
                  ? 'border-primary-500 bg-primary-500 text-white'
                  : 'border-neutral-100 bg-white text-neutral-900'
              }`}
            >
              {plan.featured ? (
                <span className="absolute right-5 top-5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white">
                  추천 예정
                </span>
              ) : null}
              <p
                className={`text-sm font-bold ${plan.featured ? 'text-white/75' : 'text-primary-500'}`}
              >
                Coming Soon
              </p>
              <h3 className="mt-4 text-3xl font-extrabold">{plan.title}</h3>
              <p className="mt-3 text-2xl font-black">{plan.price}</p>
              <p
                className={`mt-4 min-h-14 leading-relaxed ${plan.featured ? 'text-white/[0.76]' : 'text-neutral-500'}`}
              >
                {plan.description}
              </p>
              <div className="mt-7 space-y-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm font-semibold">
                    <CheckCircle2
                      className={`h-4 w-4 ${plan.featured ? 'text-white' : 'text-primary-500'}`}
                    />
                    {feature}
                  </div>
                ))}
              </div>
              <button
                type="button"
                disabled
                className={`mt-8 flex h-12 w-full items-center justify-center rounded-full text-sm font-bold ${
                  plan.featured ? 'bg-white/[0.18] text-white' : 'bg-neutral-100 text-neutral-400'
                }`}
              >
                준비 중
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-primary-500 via-[#20b7f4] to-[#85ead8] px-5 py-20 text-white lg:px-10 lg:py-24">
        <div className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-white/18 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#07111f]/12 blur-3xl" />

        <div className="relative mx-auto max-w-5xl text-center">
          <p className="mx-auto mb-5 inline-flex rounded-full border border-white/28 bg-white/16 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-white/82 backdrop-blur">
            Start Small, Ship Real
          </p>
          <h2 className="break-keep text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
            생각만 하던 아이디어,
            <br />
            이번엔 웹으로 올려보세요
          </h2>
          <p className="mx-auto mt-5 max-w-2xl break-keep text-base font-medium leading-relaxed text-white/85 sm:text-lg">
            처음이라면 단계별로 준비하고, 아이디어가 있다면 해커톤에서 바로 시작하세요.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleHackathonClick}
              className="main-cta-shine inline-flex h-13 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-extrabold text-primary-500 shadow-[0_18px_40px_rgba(0,72,160,0.22)] transition-colors hover:bg-sky-50 sm:h-14 sm:px-8 sm:text-base"
            >
              해커톤 참가하기
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={handleLearningClick}
              className="inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/34 bg-white/14 px-7 text-sm font-extrabold text-white backdrop-blur-md transition-colors hover:bg-white/22 sm:h-14 sm:px-8 sm:text-base"
            >
              단계별 학습 보기
              <BookOpenCheck className="h-4 w-4" />
            </button>
          </div>

          <p className="mx-auto mt-6 max-w-2xl break-keep text-sm font-semibold leading-relaxed text-white/74">
            완벽하게 준비되지 않아도 괜찮습니다. 첫 버전은 작게 시작하면 됩니다.
          </p>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
