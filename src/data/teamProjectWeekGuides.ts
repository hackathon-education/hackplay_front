import { JOB_TYPES } from '@/constants/jobTypes';

type JobType = (typeof JOB_TYPES)[keyof typeof JOB_TYPES];

export interface TeamProjectWeekGuideHandoff {
  role: JobType;
  roleLabel: string;
  items: string[];
  detailLinks?: {
    label: string;
    url: string;
  }[];
}

export interface TeamProjectWeekGuideDocument {
  id: string;
  title: string;
  summary: string;
  content: string;
}

export interface TeamProjectWeekGuide {
  chapter: number;
  labDescription: string;
  handoffEmptyText: string;
  handoffs: TeamProjectWeekGuideHandoff[];
  guideDisplay?: 'modalCards' | 'inlineDocument';
  guideDocuments?: TeamProjectWeekGuideDocument[];
}

export const TEAM_PROJECT_WEEK_GUIDES: Record<number, TeamProjectWeekGuide> = {
  1: {
    chapter: 1,
    labDescription:
      '이 주차의 실습은 코드를 많이 치는 것보다, 구조를 이해하는 것에 집중합니다. 프로젝트 폴더 구조, GitHub 협업 방식, 프론트엔드 코드의 흐름을 직접 살펴보며 "이 팀은 이렇게 일하는구나"를 몸으로 익히는 것이 목표입니다. 마지막에는 로컬에서 프로젝트를 실제로 실행해보며 개발 환경을 완성합니다.',
    handoffEmptyText: '이번 주차에는 직무별 전달사항이 없습니다.',
    handoffs: [],
    guideDisplay: 'modalCards',
    guideDocuments: [
      {
        id: 'folder-structure',
        title: 'VSCode에서 사용하는 폴더 역할',
        summary: 'React + Vite 프로젝트 구조와 각 폴더의 책임을 이해합니다.',
        content: `# 프로젝트 폴더 구조 가이드

## 1. 개요

이 문서는 우리 웹에서 사용하는 폴더 명칭과 역할을 설명합니다.

- React + Vite 기반 구조를 따르며, 스타일은 별도의 CSS 파일로 관리합니다.
- GitHub 버전 관리에 필요한 폴더/파일의 역할도 함께 포함합니다.

사용자는 이 가이드를 참고하여 프로젝트 구조와 각 폴더의 책임을 이해할 수 있습니다.

---

## 2. 폴더 구조 개요

\`\`\`bash
project-root/
├── .git/                # Git 버전 관리 메타데이터 (자동 생성)
├── .github/             # GitHub 전용 설정/워크플로우 (Actions, Issue 템플릿 등)
├── public/              # 정적 파일 (favicon, 이미지 등)
├── src/                 # 실제 프론트엔드 소스 코드
│   ├── assets/          # 정적 리소스 (이미지, 폰트, CSS 등)
│   ├── components/      # 공통 React 컴포넌트
│   ├── pages/           # 라우팅 단위 페이지 컴포넌트
│   ├── layouts/         # 공용 레이아웃
│   ├── styles/          # CSS/SCSS 파일
│   ├── hooks/           # 커스텀 훅
│   ├── utils/           # 유틸리티 함수
│   ├── services/        # API 요청 관련 코드
│   ├── App.jsx          # 루트 컴포넌트
│   └── main.jsx         # React DOM 렌더링 시작점
├── .gitignore           # Git에 포함하지 않을 파일/폴더 정의
├── README.md            # 프로젝트 설명 문서
├── package.json         # 의존성, 스크립트 정의
├── vite.config.js       # Vite 설정
└── index.html           # 앱 실행 HTML
\`\`\`

---

## 3. 폴더별 역할

### .git/

- Git 버전 관리를 위한 내부 메타데이터 저장소입니다.
- 커밋, 브랜치, 기록 등이 저장됩니다.
- 직접 수정하지 않고 Git 명령어를 통해서만 관리합니다.

### .github/

- GitHub 전용 설정을 관리하는 폴더입니다.

\`\`\`bash
.github/
├── workflows/                # GitHub Actions 워크플로우(CI/CD)
│   └── ci.yml
├── ISSUE_TEMPLATE/           # 이슈 작성 템플릿
│   └── bug_report.md
└── PULL_REQUEST_TEMPLATE.md  # PR 템플릿
\`\`\`

- workflows: 푸시/PR 시 자동 빌드와 테스트를 실행합니다.
- ISSUE_TEMPLATE: 버그/기능 요청 시 일정한 양식을 제공합니다.
- PULL_REQUEST_TEMPLATE.md: 팀 PR 규칙을 통일합니다.

### public/

- 정적 파일 저장소입니다.
- favicon, 로고, OG 이미지 등을 두며 빌드 시 그대로 dist/로 복사됩니다.

### src/

React 애플리케이션의 핵심 소스 코드입니다.

### assets/

- 이미지, 아이콘, 폰트, 전역 CSS 등 정적 리소스를 관리합니다.
- 예: logo.png, global.css

### components/

- 공통으로 재사용되는 UI 컴포넌트 모음입니다.
- 예: 버튼, 모달, 네비게이션 바

### pages/

- 라우팅 단위 화면 컴포넌트입니다.
- 예: /login → Login.jsx

### layouts/

- 여러 페이지에서 반복되는 공통 레이아웃을 관리합니다.
- 예: 헤더 + 사이드바 + 푸터 구조

### styles/

- CSS/SCSS 전용 폴더입니다.
- 전역 스타일과 모듈 CSS를 분리해 관리합니다.

### hooks/

- 커스텀 훅을 관리합니다.
- 예: useAuth, useFetch

### utils/

- 공통적으로 사용하는 순수 함수와 헬퍼 함수 모음입니다.
- 예: 날짜 포맷터, 문자열 변환기

### services/

- API 요청/응답 로직을 관리합니다.
- 예: authService.js, postService.js

### App.jsx

- 애플리케이션의 루트 컴포넌트입니다.
- 라우팅과 글로벌 Provider를 연결합니다.

### main.jsx

- React DOM 렌더링 시작점입니다.
- App.jsx를 브라우저에 연결합니다.

---

## 4. CSS 관리 규칙

- 전역 스타일은 src/styles/global.css에서 정의합니다.
- 컴포넌트/페이지별 스타일은 .module.css로 관리합니다.
- 클래스 충돌을 막기 위해 스타일 범위를 명확히 나눕니다.

---

## 5. GitHub 관리 파일

### .gitignore

Git에 포함하지 않을 파일을 정의합니다.

\`\`\`bash
# 빌드 산출물
dist/

# 의존성
node_modules/

# 환경 변수
.env

# IDE/OS
.vscode/
.DS_Store
*.log
\`\`\`

### README.md

- 프로젝트 설명 문서입니다.
- GitHub 저장소 첫 화면에 표시됩니다.
- 포함 내용: 개요, 설치 방법, 실행 방법, 기여 규칙

---

## 6. 참고 사항

- 새 기능 추가 시 pages, components, services 단위로 분리 배치합니다.
- API 호출 로직은 반드시 services/에 모아 관리합니다.
- assets/에는 용량이 작은 리소스만 포함하고, 대규모 파일은 CDN/스토리지를 활용합니다.
- .github/, .gitignore, README.md는 반드시 최신 상태로 유지합니다.`,
      },
      {
        id: 'database-setup',
        title: 'DB 설정',
        summary: 'MongoDB Compass와 Community Server를 설치하고 로컬 DB 연결 흐름을 익힙니다.',
        content: `# DB 설정 가이드

## 1. MongoDB 설치

### MongoDB Compass 설치

- GUI로 데이터를 확인하기 위한 도구입니다.
- 다운로드: https://www.mongodb.com/try/download/compass
- MongoDB에서 공식적으로 배포하는 도구로, 데이터를 보다 쉽게 관리할 수 있는 GUI 환경을 제공합니다.

### MongoDB Community Server 설치

- 로컬 머신에서 직접 데이터베이스를 실행하기 위한 무료 MongoDB 서버입니다.
- 다운로드: https://www.mongodb.com/try/download/community
- 자신의 컴퓨터에 설치해 로컬 DataBase를 사용할 수 있습니다.

---

## 2. 새 연결 추가

- MongoDB Compass를 실행합니다.
- Add new connection 버튼을 클릭합니다.
- 프로젝트에서 사용하는 URI와 DB Name을 입력합니다.

---

## 3. URI와 DB Name 설정

- src/main/resources/application.properties의 DB 설정과 동일해야 합니다.
- 백엔드가 바라보는 DB와 Compass에서 확인하는 DB가 다르면 데이터가 보이지 않을 수 있습니다.

---

## 4. 초기 컬렉션 확인

백엔드 실행 시 다음 컬렉션이 자동 생성됩니다.

- posts
- users
- savedPosts
- counters

---

## 5. 더미 데이터 삽입

- 테이블 생성 후 컬럼 삽입 및 더미 데이터를 삽입합니다.
- 더미 데이터는 기능 확인과 화면 테스트를 위한 기준 데이터로 사용합니다.
- 데이터 삽입 후 백엔드 API와 프론트엔드 화면에서 정상 조회되는지 확인합니다.`,
      },
      {
        id: 'git-repository',
        title: 'Git 레포 연결',
        summary: '프론트엔드/백엔드 원격 레포를 로컬에 연결하고 실행까지 확인합니다.',
        content: `# 1주차 시나리오: Git 원격 레포 연결 및 로컬 환경 세팅

신규 입사자가 팀 프로젝트에 참여하기 위해 프론트엔드 / 백엔드 레포를 로컬에 연결하고, 기본적인 Git 동작을 익히는 것을 목표로 합니다.

---

## 1. 학습 목표

- GitHub 원격 레포와 로컬 프로젝트 연결
- 최신 코드 가져오기(git pull)
- .gitignore 규칙 이해하기
- 로컬 환경에서 프로젝트 빌드 및 실행 확인

---

## 2. 시나리오 개요

1. 팀에서 제공한 GitHub 조직 초대 수락
2. 프로젝트 루트에 frontend/, backend/ 폴더 생성
3. 각 폴더를 해당 원격 레포와 연결(git remote add)
4. 원격 레포 최신 코드 가져오기(git pull origin main)
5. .gitignore 파일 확인
6. 로컬에서 빌드/실행 테스트

---

## 3. 사용자 가이드

### 프론트엔드 연결

\`\`\`bash
cd project-root/frontend
git init
git remote add origin git@github.com:org/frontend-repo.git
git pull origin main
git remote -v
\`\`\`

### 백엔드 연결

\`\`\`bash
cd project-root/backend
git init
git remote add origin git@github.com:org/backend-repo.git
git pull origin main
git remote -v
\`\`\`

---

## 4. 빌드 및 실행 확인

### 프론트엔드(React + Vite)

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

- 브라우저에서 http://localhost:5173 접속
- 기본 화면이 뜨면 연결 완료

### 백엔드(Spring Boot)

\`\`\`bash
cd backend
./gradlew bootRun
\`\`\`

- 콘솔에 Started Application 로그 확인
- 브라우저에서 http://localhost:8080 접속 확인

---

## 5. 체크리스트

- frontend/와 backend/ 각각 올바른 레포에 연결했는가? (git remote -v)
- .gitignore에 node_modules/, dist/, build/ 등이 포함돼 있는가?
- 프론트엔드 npm run dev가 정상 실행되는가?
- 백엔드 ./gradlew bootRun이 정상 실행되는가?`,
      },
      {
        id: 'collaboration',
        title: '회사 내 협업 방식 소개',
        summary: '기획, 디자인, 프론트엔드, 백엔드가 어떤 순서로 협업하는지 확인합니다.',
        content: `# 인스타그램 협업 매뉴얼: 프로젝트 진행 가이드

팀의 일원이 되신 것을 환영합니다.

본 문서는 프로젝트의 성공적인 완수를 위해 각 직무의 역할과 협업 방식을 설명하는 가이드입니다.

---

## 1. 기획 파트

프로젝트의 시작과 방향성을 제시하는 역할입니다.

시장 및 사용자 요구사항 분석을 통해 서비스의 목표와 핵심 기능을 정의합니다.

### 주요 역할

- 요구사항 정의: 고객의 니즈를 파악하여 서비스의 목표와 기능을 구체화합니다.
- 기획 문서(PD) 작성: 서비스 흐름, 화면 구성, 사용자 경험을 문서화합니다.

### 협업 순서 및 방식

1. 기획 리뷰 미팅: 기획 문서를 바탕으로 디자이너 및 개발 파트와 기술적 타당성과 디자인 적합성을 논의합니다.
2. 피드백 반영 및 공유: 논의된 내용을 바탕으로 기획을 확정하고 모든 팀원이 참고할 수 있도록 공유합니다.

---

## 2. 디자인 파트

기획자의 아이디어를 시각적으로 구현하고, 사용자에게 최적의 경험을 제공하는 역할입니다.

### 주요 역할

- UI/UX 시안 제작: 기획 문서를 토대로 화면 레이아웃, 버튼, 아이콘 등 시각적 요소를 디자인합니다.
- 디자인 시스템 구축: 일관된 디자인 원칙과 컴포넌트를 정의합니다.

### 협업 순서 및 방식

1. 디자인 공유 및 논의: 완성된 시안을 프론트엔드 개발 파트와 공유하고 구현 이슈를 협의합니다.
2. 디자인 피드백 반영: 개발팀의 피드백을 반영하여 실제 구현 가능한 디자인을 완성합니다.

---

## 3. 프론트엔드 파트

디자이너가 만든 시안을 바탕으로 사용자가 직접 보고 상호작용하는 화면을 개발합니다.

### 주요 역할

- 화면 개발: 디자인 시안을 기반으로 HTML, CSS, JavaScript를 활용해 화면을 구현합니다.
- API 연동: 백엔드 API 명세서를 활용해 데이터를 요청하고 화면에 표시합니다.

### 협업 순서 및 방식

1. API 명세서 검토: 백엔드 개발 파트와 데이터 통신 방식과 필요한 정보를 논의합니다.
2. 통합 테스트 진행: 백엔드 파트와 함께 데이터 연동이 원활한지 확인하고 오류를 수정합니다.

---

## 4. 백엔드 파트

서비스의 핵심 기능과 데이터가 안정적으로 운영되도록 서버, 데이터베이스, API를 구축하고 관리합니다.

### 주요 역할

- API 개발: 프론트엔드 파트가 필요로 하는 데이터를 효율적으로 제공하기 위한 API를 설계하고 구현합니다.
- 데이터베이스 설계: 서비스에 필요한 정보를 저장하고 관리할 데이터베이스 구조를 만듭니다.

### 협업 순서 및 방식

1. API 명세서 작성 및 공유: 프론트엔드 파트와 협의하여 API 명세서를 작성하고 일정에 맞춰 API 개발을 완료합니다.
2. 서버 환경 구축: 서비스가 안정적으로 운영될 수 있도록 서버 환경을 구축하고 배포를 담당합니다.

---

## 참고

모든 파트는 기획 문서(PD)와 API 명세서를 중심으로 협업합니다.

기획, 디자인, 개발 간의 원활한 커뮤니케이션이 프로젝트의 완성도를 결정합니다.`,
      },
    ],
  },
  2: {
    chapter: 2,
    labDescription:
      '2주차 실습은 실제 회사에서 가장 자주 하는 작업 흐름을 그대로 경험합니다. 이슈 생성 → 브랜치 분리 → 작은 수정 → 커밋 → PR → 리뷰 → 머지까지 전 과정을 직접 해보며 "팀 단위 개발"의 기본 리듬을 익힙니다. 변경 내용은 작지만, 협업의 핵심을 배우는 주차입니다.',
    handoffEmptyText: '이번 주차에는 직무별 전달사항이 없습니다.',
    handoffs: [],
    guideDisplay: 'inlineDocument',
    guideDocuments: [
      {
        id: 'simple-issue-resolution',
        title: '회사 내 간단한 이슈해결',
        summary: '작은 이슈를 직접 해결하며 팀 Git 작업 흐름을 한 번에 경험합니다.',
        content: `# 회사 내 간단한 이슈해결

이번 주차는 혼자서 작은 업무를 맡아 끝까지 처리해보는 실습입니다.

큰 기능을 만드는 것이 아니라, 회사에서 자주 만나는 작은 수정 요청을 이슈 단위로 정리하고 브랜치, 커밋, PR, 리뷰, 머지 흐름까지 직접 경험합니다.

---

## 1. 오늘의 업무 상황

팀에서 두 가지 간단한 수정 요청이 들어왔습니다.

- 로고 이미지 교체
- 홈 화면 문구 오타 수정

작아 보이는 일이어도 회사에서는 그냥 바로 고치지 않습니다. 무엇을 왜 고쳤는지 남기고, 팀원이 확인할 수 있도록 기록해야 합니다.

---

## 2. 최신 코드 받기

작업 전에는 항상 기준 브랜치를 최신 상태로 맞춥니다.

\`\`\`bash
git checkout dev
git pull origin dev
git status
\`\`\`

확인할 것:

- 현재 브랜치가 dev인지
- 원격 코드가 정상적으로 받아졌는지
- 작업 전 변경사항이 남아 있지 않은지

---

## 3. 이슈 생성

GitHub에서 작업 이슈를 2개 만듭니다.

### Issue A

- 제목: [Logo] 리브랜딩 로고로 교체
- 배경: 신규 브랜드 로고 적용 필요
- 작업 범위: src/assets/logo.svg 교체
- 완료 기준: 홈 화면에서 새 로고가 보임

### Issue B

- 제목: [Copy] 홈 타이틀 오타 수정
- 배경: 메인 문구에 오타 발견
- 작업 범위: 홈 화면 타이틀 문구 1줄 수정
- 완료 기준: 잘못된 문구가 올바르게 표시됨

---

## 4. 브랜치 생성

이슈 하나에는 브랜치 하나를 연결합니다.

\`\`\`bash
git checkout -b feature/logo-rebrand-#123 dev
\`\`\`

오타 수정 작업은 별도 브랜치에서 진행합니다.

\`\`\`bash
git checkout dev
git pull origin dev
git checkout -b fix/typo-home-title-#124
\`\`\`

브랜치 이름은 작업 성격이 드러나야 합니다.

- feature: 기능 추가 또는 눈에 보이는 개선
- fix: 오류 수정
- chore: 설정, 정리, 빌드 관련 작업

---

## 5. 작업 후 커밋

작업을 완료하면 변경 파일을 확인합니다.

\`\`\`bash
git status
git diff
\`\`\`

로고 교체 커밋:

\`\`\`bash
git add .
git commit -m "feat(brand): replace app logo with new SVG (#123)"
\`\`\`

오타 수정 커밋:

\`\`\`bash
git add .
git commit -m "fix(copy): correct home title typo (#124)"
\`\`\`

커밋 메시지는 나중에 봐도 어떤 작업인지 알 수 있어야 합니다.

---

## 6. Pull Request 생성

원격 브랜치에 push합니다.

\`\`\`bash
git push -u origin feature/logo-rebrand-#123
git push -u origin fix/typo-home-title-#124
\`\`\`

PR 작성 기준:

- Base: dev
- Compare: 작업 브랜치
- 제목: 커밋 메시지와 동일하게 작성
- 본문: 변경 요약, 전/후 스크린샷, 연결 이슈, 테스트 방법 포함

이슈 연결 예시:

\`\`\`text
Closes #123
\`\`\`

---

## 7. 리뷰 피드백 반영

리뷰어가 코멘트를 남기면 같은 브랜치에서 수정합니다.

\`\`\`bash
git add .
git commit -m "chore: apply review feedback (#123)"
git push
\`\`\`

리뷰는 개인에 대한 지적이 아니라 팀 품질을 높이는 과정입니다.

---

## 8. 머지 후 정리

PR이 승인되면 Squash and merge로 dev에 머지합니다.

로컬 브랜치는 정리합니다.

\`\`\`bash
git checkout dev
git pull origin dev
git branch -d feature/logo-rebrand-#123
git branch -d fix/typo-home-title-#124
\`\`\`

---

## 9. 완료 체크리스트

- 이슈를 작업 단위로 생성했는가?
- 이슈 번호가 브랜치명과 커밋 메시지에 포함됐는가?
- 기준 브랜치(dev)를 최신 상태로 맞췄는가?
- 변경 내용을 직접 확인했는가?
- PR에 변경 요약과 테스트 방법을 작성했는가?
- 머지 후 로컬 브랜치를 정리했는가?`,
      },
    ],
  },
  3: {
    chapter: 3,
    labDescription:
      '이번 주 실습에서는 회원가입과 로그인 기능을 처음부터 끝까지 구현 합니다. 화면 구성, 입력 검증, API 연동, 성공/실패 처리까지 사용자의 입장에서 자연스러운 인증 흐름을 만드는 것이 목표입니다. "기능이 된다"를 넘어, 왜 이렇게 동작해야 하는지를 이해합니다.',
    handoffEmptyText: '이번 주차에는 직무별 전달사항이 없습니다.',
    handoffs: [
      {
        role: JOB_TYPES.PLAN,
        roleLabel: '기획',
        items: [
          '회원가입은 이름/이메일/비밀번호/비밀번호 확인 4개 입력이에요.',
          '전부 입력되기 전까지 가입 버튼 비활성화 해주세요.',
          '성공하면 /login으로 이동하고, 실패 시 현재 페이지에서 에러만 보여주세요. 비밀번호는 최소 8자 권장 문구 넣어주세요.',
          '로딩 중엔 버튼 라벨을 가입 중…으로 바꿔주세요.',
        ],
        detailLinks: [
          {
            label: '로그인 요구사항 명세서',
            url: 'https://www.notion.so/259a586dfb0d801ab3d3db43ec5d9c2e?source=copy_link',
          },
          {
            label: '회원가입 요구사항 명세서',
            url: 'https://www.notion.so/259a586dfb0d80899c9ac6b5e368b573?source=copy_link',
          },
        ],
      },
      {
        role: JOB_TYPES.DESIGN,
        roleLabel: '디자이너',
        items: [
          '시안은 피그마 기준이고, 폰트는 Pretendard 사용해주세요.',
          '에러 메시지는 입력창 하단에 빨간색(#FF4D4F)으로 표시해주세요.',
          '모바일에선 입력창 100% 폭, 버튼 하단 여백은 16px 주세요.',
        ],
      },
      {
        role: JOB_TYPES.BACK,
        roleLabel: '백엔드',
        items: [
          '회원가입 API는 /api/v1/register로 POST입니다.',
          'Body에 name, email, password 주세요.',
          '성공 시 201로 사용자 정보를 반환하고, 실패 시 400/409/422/500으로 내려줄게요.',
        ],
        detailLinks: [
          {
            label: '로그인 API 명세서',
            url: 'https://www.notion.so/API-259a586dfb0d8013a17fe0e8a74b6b90?source=copy_link',
          },
          {
            label: '회원가입 API 명세서',
            url: 'https://www.notion.so/API-259a586dfb0d8006ac4eca9663bb54f9?source=copy_link',
          },
        ],
      },
    ],
  },
  4: {
    chapter: 4,
    labDescription:
      '4주차 실습은 서비스에 개인화 기능을 더하는 단계입니다. 게시물 저장/해제, 낙관적 업데이트, 인증 여부에 따른 접근 제어를 구현하며 사용자 경험과 서버 상태를 함께 고려하는 개발을 연습합니다. 로딩·에러·접근성까지 챙기며, 한 단계 더 현실적인 서비스를 완성합니다.',
    handoffEmptyText: '이번 주차에는 직무별 전달사항이 없습니다.',
    handoffs: [
      {
        role: JOB_TYPES.PLAN,
        roleLabel: '기획',
        items: [
          '게시물 카드에 저장 버튼 추가하고, 클릭 즉시 아이콘 상태를 바꿔주세요.',
          '로그인 안 된 상태면 저장 시도 시 /login으로 보내주세요.',
          '실패하면 원래 상태로 롤백하고, 에러 메시지는 상태 코드에 맞게 노출해주세요.',
        ],
        detailLinks: [
          {
            label: '게시물 저장 요구사항 명세서',
            url: 'https://www.notion.so/259a586dfb0d8071af54f89dd67cbc75?source=copy_link',
          },
        ],
      },
      {
        role: JOB_TYPES.DESIGN,
        roleLabel: '디자이너',
        items: [
          '저장 안 됨은 외곽 아이콘, 저장됨은 채워진 아이콘으로 구분해주세요.',
          '모바일에서도 터치하기 쉽도록 아이콘 영역은 충분히 확보해주세요.',
          'Saved 목록은 모바일 1열, 데스크톱 2열 이상 그리드로 보여주세요.',
        ],
      },
      {
        role: JOB_TYPES.BACK,
        roleLabel: '백엔드',
        items: [
          '저장은 POST /api/v1/saved, 해제는 DELETE /api/v1/saved/{postId}입니다.',
          '모든 요청에는 JWT가 필요하고, 토큰 없으면 401 내려줄게요.',
          '중복 저장 시 409, 서버 오류는 500으로 처리할게요.',
        ],
        detailLinks: [
          {
            label: '게시물 저장 API 명세서',
            url: 'https://www.notion.so/API-259a586dfb0d80359777da15052a415a?source=copy_link',
          },
        ],
      },
    ],
  },
};
