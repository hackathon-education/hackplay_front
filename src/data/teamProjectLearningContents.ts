export interface TeamProjectLearningOverview {
  lessonId: string;
  summary: string;
}

export interface TeamProjectLearningListItem {
  text: string;
  children?: TeamProjectLearningListItem[];
}

export type TeamProjectLearningContentBlock =
  | {
      type: 'title';
      text: string;
    }
  | {
      type: 'heading';
      text: string;
    }
  | {
      type: 'paragraph';
      text: string;
    }
  | {
      type: 'quote';
      lines: string[];
    }
  | {
      type: 'list';
      items: TeamProjectLearningListItem[];
    }
  | {
      type: 'code';
      language?: string;
      code: string;
    }
  | {
      type: 'table';
      headers: string[];
      rows: string[][];
    }
  | {
      type: 'divider';
    };

export interface TeamProjectLearningDetail {
  lessonId: string;
  title: string;
  blocks: TeamProjectLearningContentBlock[];
}

export const TEAM_PROJECT_LEARNING_OVERVIEWS: Record<string, TeamProjectLearningOverview> = {
  '1-1': {
    lessonId: '1-1',
    summary: '실제 회사 프로젝트가 어떤 구조와 규칙으로 구성되어 있는지 전체 그림을 파악합니다.',
  },
  '1-2': {
    lessonId: '1-2',
    summary: '프론트엔드 코드가 어떤 기준으로 나뉘어 관리되는지 구조 감각을 익힙니다.',
  },
  '1-3': {
    lessonId: '1-3',
    summary: '팀에서 합의한 스타일 관리 방식과 코드 배치 규칙을 이해합니다.',
  },
  '1-4': {
    lessonId: '1-4',
    summary: '협업을 위해 꼭 필요한 Git 설정 파일들의 역할을 알아봅니다.',
  },
  '1-5': {
    lessonId: '1-5',
    summary: '내 PC에서 프로젝트를 실행하기 위한 개발 환경과 DB를 직접 세팅합니다.',
  },
  '1-6': {
    lessonId: '1-6',
    summary: '로컬 환경과 팀 원격 레포를 연결해 실제 협업 준비를 마칩니다.',
  },
  '1-7': {
    lessonId: '1-7',
    summary: '기획, 디자인, 프론트엔드, 백엔드가 어떻게 연결되는지 협업 흐름을 이해합니다.',
  },
  '2-1': {
    lessonId: '2-1',
    summary: '이번 주에 진행할 작업과 협업 목표를 미리 정리합니다.',
  },
  '2-2': {
    lessonId: '2-2',
    summary: '작업을 시작하기 전, 팀 코드와 내 로컬 환경을 최신 상태로 맞춥니다.',
  },
  '2-3': {
    lessonId: '2-3',
    summary: '작업을 이슈 단위로 나누고 명확한 범위를 설정하는 법을 익힙니다.',
  },
  '2-4': {
    lessonId: '2-4',
    summary: '브랜치를 활용한 안전한 작업 흐름을 실습합니다.',
  },
  '2-5': {
    lessonId: '2-5',
    summary: '팀 규칙에 맞는 커밋 메시지 작성과 기록 남기기를 연습합니다.',
  },
  '2-6': {
    lessonId: '2-6',
    summary: '변경 내용을 PR로 공유하고 설명하는 과정을 경험합니다.',
  },
  '2-7': {
    lessonId: '2-7',
    summary: '머지 이후 정리까지 포함한 완성된 Git 작업 흐름을 익힙니다.',
  },
  '3-1': {
    lessonId: '3-1',
    summary: '사용자가 회원가입할 수 있는 기본 화면을 구성합니다.',
  },
  '3-2': {
    lessonId: '3-2',
    summary: '잘못된 입력을 사전에 막기 위한 검증 로직을 구현합니다.',
  },
  '3-3': {
    lessonId: '3-3',
    summary: '회원 정보를 서버로 전달해 실제 계정을 생성합니다.',
  },
  '3-4': {
    lessonId: '3-4',
    summary: '서버 응답에 따라 다른 사용자 경험을 설계합니다.',
  },
  '3-5': {
    lessonId: '3-5',
    summary: '로그인 기능을 위한 화면과 입력 흐름을 만듭니다.',
  },
  '3-6': {
    lessonId: '3-6',
    summary: '인증 토큰을 저장하고 로그인 상태를 유지합니다.',
  },
  '3-7': {
    lessonId: '3-7',
    summary: '로그인 실패 상황에서도 이해하기 쉬운 UX를 제공합니다.',
  },
  '4-1': {
    lessonId: '4-1',
    summary: '게시물을 저장할 수 있는 기본 UI를 구현합니다.',
  },
  '4-2': {
    lessonId: '4-2',
    summary: '즉각적인 반응을 주는 저장 UX를 적용합니다.',
  },
  '4-3': {
    lessonId: '4-3',
    summary: '저장 기능을 서버 데이터와 연결합니다.',
  },
  '4-4': {
    lessonId: '4-4',
    summary: '저장된 게시물을 다시 해제할 수 있도록 합니다.',
  },
  '4-5': {
    lessonId: '4-5',
    summary: '로그인 상태에 따라 기능 접근을 제어합니다.',
  },
  '4-6': {
    lessonId: '4-6',
    summary: '사용자가 저장한 게시물을 한 곳에서 볼 수 있게 합니다.',
  },
  '4-7': {
    lessonId: '4-7',
    summary: '로딩과 오류 상황에서도 안정적인 사용자 경험을 완성합니다.',
  },
};

export const TEAM_PROJECT_LEARNING_DETAILS: Record<string, TeamProjectLearningDetail> = {
  '1-1': {
    lessonId: '1-1',
    title: '팀 프로젝트 구조 이해',
    blocks: [
      {
        type: 'quote',
        lines: [
          '코드를 치기 전에 먼저 해야 할 일이 있습니다.',
          '👉 “이 팀은 어떻게 일하는가?”를 이해하는 것입니다.',
        ],
      },
      {
        type: 'heading',
        text: '프로젝트 개요 & 기술 스택 파악하기',
      },
      {
        type: 'list',
        items: [
          { text: '이 프로젝트는 React + Vite 기반으로 구성되어 있습니다' },
          {
            text: '스타일은 CSS를 분리 관리하여 유지보수와 협업에 유리하게 설계되어 있습니다',
          },
          { text: '모든 작업은 GitHub를 중심으로 협업하며, 기록과 흐름이 남습니다' },
        ],
      },
      {
        type: 'quote',
        lines: [
          '💡 이 단계의 목표는 “외워서 쓰기”가 아니라',
          '“아, 이런 이유로 이 스택을 쓰는구나”를 느끼는 것입니다.',
        ],
      },
      { type: 'divider' },
      {
        type: 'heading',
        text: '프로젝트 전체 폴더 구조 한눈에 보기',
      },
      {
        type: 'list',
        items: [
          { text: '모든 작업의 시작점은 project-root/' },
          {
            text: '이 안에는:',
            children: [
              { text: '실제 코드가 있는 공간' },
              { text: '협업을 위한 GitHub 설정' },
              { text: '빌드와 실행을 위한 설정 파일들이 함께 존재합니다' },
            ],
          },
        ],
      },
      {
        type: 'quote',
        lines: [
          '📦 폴더 구조는 팀의 약속입니다.',
          '이 약속을 이해하면, 남의 코드도 훨씬 편해집니다.',
        ],
      },
      { type: 'divider' },
      {
        type: 'heading',
        text: 'Git & GitHub 폴더는 왜 존재할까?',
      },
      {
        type: 'list',
        items: [
          {
            text: '.git/',
            children: [
              { text: '이 프로젝트의 모든 기록과 시간표' },
              { text: '직접 건드리지 않고 Git 명령어로만 다룹니다' },
            ],
          },
          {
            text: '.github/',
            children: [
              { text: '팀 협업을 자동화하는 공간' },
              { text: 'GitHub Actions (CI/CD)' },
              { text: 'Issue 템플릿' },
              { text: 'Pull Request 템플릿' },
            ],
          },
        ],
      },
      {
        type: 'quote',
        lines: [
          '🤝 이 폴더 덕분에',
          '“사람이 많아져도 프로젝트는 질서 있게 굴러갑니다.”',
        ],
      },
    ],
  },
  '1-2': {
    lessonId: '1-2',
    title: '프론트엔드 소스 구조 이해',
    blocks: [
      { type: 'quote', lines: ['이제 본격적으로 코드가 사는 공간으로 들어가 봅니다.'] },
      { type: 'heading', text: 'public/ vs src/ – 역할부터 구분하자' },
      {
        type: 'list',
        items: [
          {
            text: 'public/',
            children: [
              { text: '빌드 과정 없이 그대로 제공되는 정적 자원' },
              { text: 'favicon, OG 이미지 등' },
            ],
          },
          {
            text: 'src/',
            children: [
              { text: '실제로 우리가 수정하고, 기능을 만드는 공간' },
              { text: '이 프로젝트의 심장' },
            ],
          },
        ],
      },
      {
        type: 'quote',
        lines: ['🔍 “어디에 코드를 써야 하지?”라는 고민은', '이 구분만 알아도 절반은 사라집니다.'],
      },
      { type: 'divider' },
      { type: 'heading', text: 'src/ 안에서 길 잃지 않는 법' },
      {
        type: 'list',
        items: [
          { text: 'assets/ : 이미지, 폰트, 전역 CSS' },
          { text: 'components/ : 재사용 가능한 UI 조각' },
          { text: 'pages/ : URL 단위 화면' },
          { text: 'layouts/ : 공통 레이아웃 틀' },
          { text: 'hooks/ : 커스텀 훅 모음' },
          { text: 'utils/ : 순수 함수 & 헬퍼' },
          { text: 'services/ : API 통신 전용 공간' },
          { text: 'styles/ : CSS/SCSS 관리' },
        ],
      },
      {
        type: 'quote',
        lines: ['🧭 이 구조를 알면', '“이 코드는 여기 있으면 안 되는데?”라는 감각이 생깁니다.'],
      },
      { type: 'divider' },
      { type: 'heading', text: '앱이 시작되는 지점 이해하기' },
      {
        type: 'list',
        items: [
          { text: 'main.jsx: React가 브라우저에 처음 연결되는 곳' },
          { text: 'App.jsx: 라우팅과 전역 설정의 중심' },
        ],
      },
      { type: 'quote', lines: ['🚪 이 두 파일은', '“앱의 입구와 관제탑”이라고 생각하면 됩니다.'] },
    ],
  },
  '1-3': {
    lessonId: '1-3',
    title: '스타일(CSS)과 코드 관리 규칙 이해',
    blocks: [
      { type: 'heading', text: '스타일 관리의 기본 원칙' },
      {
        type: 'list',
        items: [
          { text: '전역 스타일: src/styles/global.css' },
          { text: '컴포넌트/페이지 스타일: .module.css' },
          { text: '클래스 충돌을 막기 위한 모듈 CSS 사용' },
        ],
      },
      {
        type: 'quote',
        lines: [
          '🎨 스타일 규칙은',
          '“지금 편한 코드”보다',
          '“나중에 안 망가지는 코드”를 위한 선택입니다.',
        ],
      },
      { type: 'divider' },
      { type: 'heading', text: '팀이 합의한 코드 배치 규칙' },
      {
        type: 'list',
        items: [
          {
            text: '기능 추가 시',
            children: [
              { text: '화면 → pages' },
              { text: 'UI → components' },
              { text: 'API → services' },
            ],
          },
          { text: 'API 호출 로직은 반드시 services/에 모아서 관리' },
          { text: '정적 리소스는 가볍게, 무거운 파일은 외부로' },
        ],
      },
      {
        type: 'quote',
        lines: ['📐 이 규칙은', '“잘 굴러가는 팀”이 되기 위한 최소한의 질서입니다.'],
      },
    ],
  },
  '1-4': {
    lessonId: '1-4',
    title: 'GitHub 관리 파일 이해',
    blocks: [
      { type: 'heading', text: '.gitignore는 왜 중요할까?' },
      {
        type: 'list',
        items: [
          {
            text: 'Git에 올리면 안 되는 것들',
            children: [{ text: 'node_modules/' }, { text: 'dist/' }, { text: '.env' }],
          },
          { text: '팀 공통 기준으로 관리되어야 함' },
        ],
      },
      {
        type: 'quote',
        lines: ['🚫 이 파일 하나로', '“쓸데없는 충돌과 사고”를 예방할 수 있습니다.'],
      },
      { type: 'divider' },
      { type: 'heading', text: 'README.md는 팀의 안내서' },
      {
        type: 'list',
        items: [{ text: '프로젝트 개요' }, { text: '실행 방법' }, { text: '협업 규칙' }],
      },
      {
        type: 'quote',
        lines: ['📘 README는', '“이 프로젝트에 처음 들어온 사람을 위한 설명서”입니다.'],
      },
    ],
  },
  '1-5': {
    lessonId: '1-5',
    title: '로컬 개발 환경 & 데이터베이스 세팅',
    blocks: [
      { type: 'quote', lines: ['이제 코드를 실제로 내 컴퓨터에서 움직여볼 차례입니다.'] },
      { type: 'heading', text: 'MongoDB 환경 준비' },
      {
        type: 'list',
        items: [
          { text: 'MongoDB Compass 설치 → 데이터 눈으로 확인' },
          { text: 'MongoDB Community Server 설치 → 로컬 DB 사용' },
        ],
      },
      { type: 'divider' },
      { type: 'heading', text: '데이터베이스 연결하기' },
      {
        type: 'list',
        items: [
          { text: 'MongoDB URI & DB Name 설정' },
          { text: '백엔드 application.properties와 일치 확인' },
        ],
      },
      { type: 'divider' },
      { type: 'heading', text: '초기 데이터 구조 살펴보기' },
      {
        type: 'list',
        items: [
          { text: 'posts, users, savedPosts, counters' },
          { text: '백엔드 실행 시 자동 생성 흐름 이해' },
          { text: '더미 데이터는 테스트를 위한 친구' },
        ],
      },
    ],
  },
  '1-6': {
    lessonId: '1-6',
    title: 'Git 원격 레포 연결 실습',
    blocks: [
      { type: 'heading', text: '팀에 합류하기' },
      {
        type: 'list',
        items: [{ text: 'GitHub 조직 초대 수락' }, { text: '프론트엔드 / 백엔드 레포 구분' }],
      },
      { type: 'divider' },
      { type: 'heading', text: '내 PC와 팀 코드 연결' },
      {
        type: 'list',
        items: [
          { text: 'git init' },
          { text: 'git remote add' },
          { text: 'git pull origin main' },
          { text: 'git remote -v로 연결 확인' },
        ],
      },
      { type: 'divider' },
      { type: 'heading', text: '실제 실행해보기' },
      {
        type: 'list',
        items: [
          { text: '프론트엔드 실행' },
          { text: '백엔드 실행' },
          { text: '“아, 진짜 돌아간다” 경험하기 😄' },
        ],
      },
    ],
  },
  '1-7': {
    lessonId: '1-7',
    title: '직무별 협업 흐름 이해',
    blocks: [
      { type: 'quote', lines: ['이 프로젝트는 혼자 만드는 게 아닙니다.'] },
      { type: 'heading', text: '기획 파트' },
      {
        type: 'list',
        items: [{ text: '요구사항 정의' }, { text: '기획 문서 작성' }, { text: '리뷰 → 수정 → 공유' }],
      },
      { type: 'heading', text: '디자인 파트' },
      {
        type: 'list',
        items: [{ text: 'UI/UX 시안 제작' }, { text: '디자인 시스템 구축' }, { text: '개발과의 협의' }],
      },
      { type: 'heading', text: '프론트엔드 파트' },
      {
        type: 'list',
        items: [{ text: '화면 구현' }, { text: 'API 연동' }, { text: '통합 테스트' }],
      },
      { type: 'heading', text: '백엔드 파트' },
      {
        type: 'list',
        items: [{ text: 'API 설계' }, { text: 'DB 설계' }, { text: '서버 환경 구축' }],
      },
      {
        type: 'quote',
        lines: ['🔄 모든 파트는', '기획 문서와 API 명세서를 중심으로 연결됩니다.'],
      },
    ],
  },
  '2-1': {
    lessonId: '2-1',
    title: '팀 코드와 로컬 환경 동기화',
    blocks: [
      { type: 'quote', lines: ['업무의 시작은 언제나 “최신 코드 받기”입니다.'] },
      { type: 'heading', text: '원격 레포 클론' },
      {
        type: 'list',
        items: [{ text: '팀 레포를 내 PC로 복사' }, { text: '프로젝트 루트로 이동' }],
      },
      { type: 'divider' },
      { type: 'heading', text: '현재 상태 확인' },
      {
        type: 'list',
        items: [
          { text: '지금 어떤 브랜치에 있는지 확인' },
          { text: '원격(origin)이 제대로 연결되어 있는지 확인' },
        ],
      },
      { type: 'divider' },
      { type: 'heading', text: '기준 브랜치 최신화' },
      {
        type: 'list',
        items: [
          { text: 'dev(또는 main) 브랜치로 이동' },
          { text: '원격 기준 브랜치와 동기화' },
        ],
      },
      {
        type: 'code',
        language: 'bash',
        code: `git clone https://github.com/<org>/<repo>.git
cd <repo>

git branch
git remote -v

git checkout dev
git pull origin dev`,
      },
      { type: 'quote', lines: ['📌 이 단계는 습관입니다.', '작업 전마다 꼭 확인하세요.'] },
    ],
  },
  '2-2': {
    lessonId: '2-2',
    title: '이슈 생성 후, 작업 범위 정의',
    blocks: [
      {
        type: 'quote',
        lines: [
          '회사에서는 “그냥 고쳤어요”가 통하지 않습니다.',
          '무엇을, 왜, 어떻게 고쳤는지가 남아야 합니다.',
        ],
      },
      { type: 'heading', text: '이슈를 만드는 이유' },
      {
        type: 'list',
        items: [
          { text: '작업 단위를 명확히 나누기 위해' },
          { text: '나중에 변경 이유를 추적하기 위해' },
          { text: '팀원과 같은 맥락에서 대화하기 위해' },
        ],
      },
      { type: 'divider' },
      { type: 'heading', text: '오늘의 이슈 2건' },
      {
        type: 'list',
        items: [{ text: 'Issue A: 로고 이미지 교체' }, { text: 'Issue B: 홈 화면 문구 오타 수정' }],
      },
      { type: 'quote', lines: ['✨ 작아 보여도', '이슈 단위로 관리하는 연습이 핵심입니다.'] },
      { type: 'divider' },
      { type: 'heading', text: '좋은 이슈 작성 가이드' },
      {
        type: 'list',
        items: [
          {
            text: '제목 예시',
            children: [
              { text: '[Logo] 리브랜딩 로고로 교체' },
              { text: '[Copy] 홈 타이틀 오타 수정 ("Welcom" → "Welcome")' },
            ],
          },
          {
            text: '꼭 포함할 내용',
            children: [
              { text: '배경: 왜 이 작업이 필요한가' },
              { text: '작업 범위: 무엇을 고칠 것인가' },
              { text: '완료 기준: 언제 끝났다고 말할 수 있는가' },
              { text: '테스트 방법: 어떻게 확인할 것인가' },
            ],
          },
          { text: '라벨: frontend, first issue' },
          { text: 'Assignee: 본인' },
        ],
      },
      { type: 'quote', lines: ['📝 좋은 이슈는', '리뷰와 협업을 훨씬 편하게 만듭니다.'] },
    ],
  },
  '2-3': {
    lessonId: '2-3',
    title: '이슈 단위 브랜치로 작업 흐름 구성',
    blocks: [
      {
        type: 'quote',
        lines: ['메인 브랜치는 전쟁터가 아닙니다.', '작업은 항상 브랜치에서 합니다.'],
      },
      { type: 'heading', text: '브랜치 네이밍 규칙' },
      {
        type: 'list',
        items: [
          { text: '이슈 하나 = 브랜치 하나' },
          {
            text: '형식',
            children: [
              { text: 'feature/<작업명>-#이슈번호' },
              { text: 'fix/<작업명>-#이슈번호' },
            ],
          },
        ],
      },
      { type: 'divider' },
      { type: 'heading', text: '로고 교체 브랜치 생성' },
      { type: 'code', language: 'bash', code: 'git checkout -b feature/logo-rebrand-#123 dev' },
      { type: 'divider' },
      { type: 'heading', text: '오타 수정 브랜치 생성' },
      {
        type: 'code',
        language: 'bash',
        code: `git checkout dev
git pull origin dev
git checkout -b fix/typo-home-title-#124`,
      },
      { type: 'quote', lines: ['🔀 이 흐름이 몸에 배면', '충돌이 훨씬 줄어듭니다.'] },
    ],
  },
  '2-4': {
    lessonId: '2-4',
    title: '변경 사항 커밋 규칙 이해 및 적용',
    blocks: [
      { type: 'quote', lines: ['커밋은 “무엇을 했는지 남기는 기록”입니다.'] },
      { type: 'heading', text: '작업 A – 로고 이미지 교체' },
      {
        type: 'list',
        items: [
          { text: 'src/assets/logo.svg 교체' },
          { text: '실제 화면에서 로고가 정상 표시되는지 확인' },
        ],
      },
      {
        type: 'code',
        language: 'bash',
        code: `git add .
git commit -m "feat(brand): replace app logo with new SVG (#123)"`,
      },
      { type: 'divider' },
      { type: 'heading', text: '작업 B – 문구 오타 수정' },
      { type: 'list', items: [{ text: '홈 화면 타이틀 문구 1줄 수정' }] },
      {
        type: 'code',
        language: 'bash',
        code: `git add .
git commit -m "fix(copy): correct home title typo (#124)"`,
      },
      { type: 'divider' },
      { type: 'heading', text: '커밋 메시지 규칙' },
      {
        type: 'list',
        items: [
          { text: '타입 예시: feat, fix, docs, chore, refactor, style, test' },
          { text: '이슈 번호는 반드시 포함' },
        ],
      },
      {
        type: 'quote',
        lines: ['🧾 커밋 로그만 봐도', '어떤 일이 있었는지 알 수 있게 만드는 게 목표입니다.'],
      },
    ],
  },
  '2-5': {
    lessonId: '2-5',
    title: 'Pull Request로 변경 사항 공유',
    blocks: [
      { type: 'heading', text: '원격 브랜치로 푸시' },
      {
        type: 'code',
        language: 'bash',
        code: `git push -u origin feature/logo-rebrand-#123
git push -u origin fix/typo-home-title-#124`,
      },
      { type: 'divider' },
      { type: 'heading', text: 'Pull Request 생성' },
      {
        type: 'list',
        items: [
          { text: 'Base: dev' },
          { text: 'Compare: 작업 브랜치' },
          { text: 'PR 제목: 커밋 메시지와 동일' },
        ],
      },
      { type: 'divider' },
      { type: 'heading', text: 'PR 본문 작성 요령' },
      {
        type: 'list',
        items: [
          { text: '변경 요약: 한 문장으로 핵심만' },
          { text: '전/후 스크린샷 첨부' },
          { text: '연결 이슈: Closes #123' },
          {
            text: '체크리스트',
            children: [
              { text: '빌드 성공' },
              { text: '셀프 리뷰 완료' },
              { text: '라벨 / Assignee 확인' },
            ],
          },
        ],
      },
      { type: 'quote', lines: ['🔍 PR은', '“코드를 설명하는 자리”입니다.'] },
    ],
  },
  '2-6': {
    lessonId: '2-6',
    title: '리뷰 피드백 반영 흐름 이해',
    blocks: [
      { type: 'heading', text: '리뷰 확인' },
      {
        type: 'list',
        items: [{ text: '리뷰어 코멘트' }, { text: 'CI 자동 체크 결과 확인' }],
      },
      { type: 'divider' },
      { type: 'heading', text: '피드백 반영' },
      {
        type: 'list',
        items: [{ text: '요청사항 수정' }, { text: '같은 브랜치에 추가 커밋' }],
      },
      {
        type: 'code',
        language: 'bash',
        code: `git add .
git commit -m "chore: apply review feedback (#123)"
git push`,
      },
      { type: 'quote', lines: ['💬 리뷰는 지적이 아니라', '팀의 품질을 높이는 과정입니다.'] },
    ],
  },
  '2-7': {
    lessonId: '2-7',
    title: '머지 후 브랜치 정리까지 마무리',
    blocks: [
      { type: 'heading', text: '머지 전략' },
      {
        type: 'list',
        items: [{ text: 'Squash and merge 권장' }, { text: '커밋 히스토리를 간결하게 유지' }],
      },
      { type: 'divider' },
      { type: 'heading', text: '이슈 자동 종료 확인' },
      {
        type: 'list',
        items: [{ text: 'PR에 Closes #이슈번호' }, { text: '머지 후 이슈 자동 종료 확인' }],
      },
      { type: 'divider' },
      { type: 'heading', text: '로컬 브랜치 정리' },
      {
        type: 'code',
        language: 'bash',
        code: `git checkout dev
git pull origin dev
git branch -d feature/logo-rebrand-#123
git branch -d fix/typo-home-title-#124`,
      },
      { type: 'quote', lines: ['🧹 작업이 끝났다면', '흔적도 정리하는 게 프로답습니다.'] },
    ],
  },
  '3-1': {
    lessonId: '3-1',
    title: '회원가입 화면 구성',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '사용자가 /register에 접속하면 회원가입 화면을 볼 수 있어야 한다.' },
      { type: 'heading', text: '해야 할 일' },
      {
        type: 'list',
        items: [
          { text: '/register 라우트 생성' },
          {
            text: '입력 필드 4개 배치',
            children: [
              { text: '이름' },
              { text: '이메일' },
              { text: '비밀번호' },
              { text: '비밀번호 확인' },
            ],
          },
          { text: '비밀번호 입력칸에 표시/숨김 토글 추가' },
          { text: '아직은 API 연결 ❌' },
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '/register 접속 시 화면이 보인다' },
          { text: '모든 입력칸이 비어 있으면 “가입하기” 버튼은 비활성화 상태다' },
        ],
      },
    ],
  },
  '3-2': {
    lessonId: '3-2',
    title: '회원가입 입력 검증 규칙 적용',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '사용자가 잘못된 정보를 입력하면 즉시 알 수 있어야 한다.' },
      { type: 'heading', text: '적용 규칙' },
      {
        type: 'list',
        items: [
          { text: '이메일 → 이메일 형식인지 검사' },
          {
            text: '비밀번호',
            children: [{ text: '8자 이상' }, { text: '영문 / 숫자 / 특수문자 포함' }],
          },
          { text: '비밀번호 확인 → 비밀번호와 일치해야 함' },
        ],
      },
      { type: 'heading', text: 'UX 포인트' },
      {
        type: 'list',
        items: [
          { text: '입력하는 즉시 결과 표시 (실시간)' },
          { text: '에러는 빨간색, 성공은 초록색 등 시각적 피드백 제공' },
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '잘못 입력하면 바로 경고가 나온다' },
          { text: '모든 조건이 만족되었을 때만 버튼이 활성화된다' },
        ],
      },
    ],
  },
  '3-3': {
    lessonId: '3-3',
    title: '회원가입 API 요청 연동',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '회원 정보를 서버에 전달하여 계정을 생성한다.' },
      { type: 'heading', text: '사용할 API' },
      { type: 'code', language: 'text', code: 'POST /api/v1/register' },
      { type: 'heading', text: '보낼 데이터' },
      {
        type: 'code',
        language: 'json',
        code: `{
  "name": "string",
  "email": "string",
  "password": "string"
}`,
      },
      { type: 'paragraph', text: '⚠️ confirmPassword는 프론트에서만 쓰고 서버에는 보내지 않는다' },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '버튼 클릭 또는 Enter 키로 요청이 전송된다' },
          { text: '브라우저 Network 탭에서 요청/응답을 확인할 수 있다' },
        ],
      },
    ],
  },
  '3-4': {
    lessonId: '3-4',
    title: '회원가입 성공과 실패 처리 흐름 구성',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '서버 응답에 따라 다르게 반응하는 회원가입 UX를 만든다.' },
      { type: 'heading', text: '성공했을 때' },
      {
        type: 'list',
        items: [
          { text: '상태 코드: 201' },
          {
            text: '처리',
            children: [{ text: '가입 성공 알림(선택)' }, { text: '/login 페이지로 이동' }],
          },
        ],
      },
      { type: 'heading', text: '실패했을 때' },
      {
        type: 'table',
        headers: ['상황', '사용자에게 보여줄 메시지'],
        rows: [
          ['400 / 422', '입력값을 확인해주세요'],
          ['409', '이미 사용 중인 이메일입니다'],
          ['500', '서버 오류입니다. 잠시 후 다시 시도하세요'],
          ['네트워크 오류', '네트워크 상태를 확인해주세요'],
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      { type: 'list', items: [{ text: '같은 화면이라도 상태에 따라 다른 메시지가 나온다' }] },
    ],
  },
  '3-5': {
    lessonId: '3-5',
    title: '로그인 화면 구성',
    blocks: [
      {
        type: 'quote',
        lines: [
          '이제 가입은 끝났습니다.',
          '하지만 아직 사용자는 서비스 안으로 들어올 수 없습니다.',
        ],
      },
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '로그인에 성공한 사용자만 메인 페이지(/)에 입장할 수 있게 한다.' },
      { type: 'heading', text: '해야 할 일' },
      {
        type: 'list',
        items: [
          { text: '/login 페이지 생성' },
          { text: '이메일 / 비밀번호 입력 폼 구성' },
          { text: '둘 다 입력해야 버튼 활성화' },
        ],
      },
    ],
  },
  '3-6': {
    lessonId: '3-6',
    title: '로그인 토큰 저장과 인증 상태 유지',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '로그인 성공 시 인증 토큰(JWT)을 저장하고 상태를 유지한다.' },
      { type: 'heading', text: '사용할 API' },
      { type: 'code', language: 'text', code: 'POST /api/v1/login' },
      { type: 'heading', text: '성공 응답' },
      {
        type: 'code',
        language: 'json',
        code: `{
  "accessToken": "JWT_STRING"
}`,
      },
      { type: 'heading', text: '처리 방식' },
      {
        type: 'list',
        items: [
          { text: 'accessToken을 localStorage에 저장' },
          { text: '저장 후 메인 페이지(/)로 이동' },
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '로그인 성공 시 메인 페이지로 이동한다' },
          { text: '새로고침해도 로그인 상태가 유지된다' },
        ],
      },
    ],
  },
  '3-7': {
    lessonId: '3-7',
    title: '로그인 실패 처리와 UX 보완',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '실패한 사용자도 왜 실패했는지 이해할 수 있게 한다.' },
      {
        type: 'table',
        headers: ['상태 코드', '메시지'],
        rows: [
          ['401', '이메일 또는 비밀번호를 확인하세요'],
          ['403', '접근 권한이 없습니다'],
          ['404', '사용자를 찾을 수 없습니다'],
          ['500', '서버 오류입니다. 잠시 후 다시 시도하세요'],
        ],
      },
      { type: 'heading', text: 'UX 추가' },
      {
        type: 'list',
        items: [
          { text: '요청 중 버튼 비활성화' },
          { text: '버튼 라벨 → “로그인 중…”' },
          { text: 'Enter 키로 로그인 가능' },
          { text: '첫 진입 시 이메일 입력칸 자동 포커스' },
        ],
      },
    ],
  },
  '4-1': {
    lessonId: '4-1',
    title: '게시물 저장 UI 구성',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '홈 피드의 게시물 카드에서 사용자가 “이 게시물 마음에 들어”라고 표시할 수 있어야 한다.' },
      { type: 'heading', text: '해야 할 일' },
      {
        type: 'list',
        items: [
          { text: '게시물 카드 우하단에 저장 아이콘 추가' },
          {
            text: '상태 구분',
            children: [{ text: '미저장 → 외곽 아이콘' }, { text: '저장됨 → 채워진 아이콘' }],
          },
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '게시물 카드마다 저장 아이콘이 보인다' },
          { text: '아직 클릭해도 API는 호출하지 않는다' },
        ],
      },
    ],
  },
  '4-2': {
    lessonId: '4-2',
    title: '낙관적 업데이트로 저장 UX 구성',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '사용자는 클릭한 순간 결과를 보고 싶어 한다.' },
      { type: 'heading', text: 'UX 규칙' },
      {
        type: 'list',
        items: [
          {
            text: '아이콘 클릭 시',
            children: [{ text: 'API 응답을 기다리지 않고 즉시 아이콘 상태 변경' }],
          },
          {
            text: '실패하면',
            children: [{ text: '다시 원래 상태로 롤백' }],
          },
        ],
      },
      { type: 'quote', lines: ['이것이 바로 낙관적 업데이트(Optimistic Update)'] },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '클릭하면 즉시 아이콘이 토글된다' },
          { text: '실패 시 “아무 일도 없었던 것처럼” 돌아간다' },
        ],
      },
    ],
  },
  '4-3': {
    lessonId: '4-3',
    title: '게시물 저장 API 연동',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '저장 버튼이 진짜 서버 데이터로 이어지게 한다.' },
      { type: 'heading', text: '사용할 API' },
      { type: 'code', language: 'text', code: 'POST /api/v1/saved' },
      { type: 'heading', text: '보낼 데이터' },
      { type: 'code', language: 'json', code: '{"postId":"string"}' },
      { type: 'heading', text: '성공 시' },
      {
        type: 'list',
        items: [{ text: '응답: saved: true' }, { text: 'UI 유지' }],
      },
      { type: 'heading', text: '실패 시' },
      {
        type: 'list',
        items: [{ text: '상태코드에 따라 메시지 표시' }, { text: '아이콘 상태 롤백' }],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: 'Network 탭에서 저장 요청이 보인다' },
          { text: '중복 저장 시 서버에서 409가 온다' },
        ],
      },
    ],
  },
  '4-4': {
    lessonId: '4-4',
    title: '게시물 저장 해제 기능 구현',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '저장한 게시물은 언제든지 다시 풀 수 있어야 한다.' },
      { type: 'heading', text: '사용할 API' },
      { type: 'code', language: 'text', code: 'DELETE /api/v1/saved/{postId}' },
      { type: 'heading', text: '동작 방식' },
      {
        type: 'list',
        items: [
          { text: '저장됨 상태에서 클릭 → 해제 요청' },
          { text: '성공 시 → 미저장 상태' },
          { text: '실패 시 → 다시 저장 상태로 롤백' },
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '저장 ↔ 해제가 자연스럽게 반복된다' },
          { text: '중복 클릭은 방지된다(로딩 중 비활성화)' },
        ],
      },
    ],
  },
  '4-5': {
    lessonId: '4-5',
    title: '인증 여부에 따른 저장 기능 접근 제어',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '저장은 로그인한 사용자만 할 수 있다.' },
      { type: 'heading', text: '규칙' },
      {
        type: 'list',
        items: [
          { text: '모든 저장/해제/조회 요청에는 JWT 필요' },
          {
            text: '로그인 안 된 상태에서 저장 시도하면',
            children: [{ text: '알림 표시: “로그인이 필요합니다”' }, { text: '/login 페이지로 이동' }],
          },
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '토큰이 없으면 API를 호출하지 않는다' },
          { text: '자연스럽게 로그인 화면으로 유도된다' },
        ],
      },
    ],
  },
  '4-6': {
    lessonId: '4-6',
    title: 'Saved 목록 화면 구성',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '사용자가 저장한 게시물을 한 곳에 모아본다.' },
      { type: 'heading', text: '화면 위치' },
      {
        type: 'list',
        items: [{ text: '프로필 페이지 /:username' }, { text: 'Saved 탭 또는 섹션 추가' }],
      },
      { type: 'heading', text: '사용할 API' },
      { type: 'code', language: 'text', code: 'GET /api/v1/saved' },
      { type: 'heading', text: '렌더링 방식' },
      {
        type: 'list',
        items: [
          {
            text: '카드 그리드',
            children: [{ text: '모바일: 1열' }, { text: '데스크톱: 2열 이상' }],
          },
        ],
      },
      { type: 'heading', text: '빈 상태 UX' },
      {
        type: 'list',
        items: [
          {
            text: '저장한 게시물이 없을 경우',
            children: [
              { text: '문구: “아직 저장한 게시물이 없어요”' },
              { text: '빈 상태 일러스트 표시' },
            ],
          },
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: 'Saved 탭에서 저장 목록이 보인다' },
          { text: '없을 때도 어색하지 않다' },
        ],
      },
    ],
  },
  '4-7': {
    lessonId: '4-7',
    title: '로딩과 오류 상태 처리까지 완성',
    blocks: [
      { type: 'heading', text: '🎯 목표' },
      { type: 'paragraph', text: '사용자는 지금 무슨 일이 일어나는지 알아야 한다.' },
      { type: 'heading', text: '로딩 처리' },
      {
        type: 'list',
        items: [{ text: '아이콘 클릭 시 로딩 표시' }, { text: '로딩 중 중복 클릭 방지' }],
      },
      { type: 'heading', text: '오류 메시지' },
      {
        type: 'table',
        headers: ['상태', '메시지'],
        rows: [
          ['400', '잘못된 요청입니다'],
          ['401', '로그인이 필요합니다'],
          ['403', '저장 권한이 없습니다'],
          ['404', '게시물을 찾을 수 없습니다'],
          ['409', '이미 저장한 게시물입니다'],
          ['500', '서버 오류입니다. 잠시 후 다시 시도하세요'],
        ],
      },
      { type: 'heading', text: '✔ 완료 조건' },
      {
        type: 'list',
        items: [
          { text: '실패 원인이 사용자에게 전달된다' },
          { text: 'UI가 멈춘 느낌이 들지 않는다' },
        ],
      },
    ],
  },
};
