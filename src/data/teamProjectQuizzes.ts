export interface TeamProjectQuizQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

const makeQuestion = (
  lessonId: string,
  index: number,
  question: string,
  options: string[],
  answerIndex: number,
): TeamProjectQuizQuestion => ({
  id: `${lessonId}-q${index}`,
  question,
  options,
  answerIndex,
  explanation: `정답은 ${answerIndex + 1}번입니다.`,
});

export const TEAM_PROJECT_QUIZZES: Record<string, TeamProjectQuizQuestion[]> = {
  '1-1': [
    makeQuestion('1-1', 1, '이 프로젝트의 프론트엔드 기술 스택으로 명시된 것은?', [
      'React + Next.js',
      'Vue + Vite',
      'React + Vite',
      'Svelte + Vite',
    ], 2),
    makeQuestion('1-1', 2, '스타일을 CSS로 분리 관리하는 이유로 문서에 언급된 것은?', [
      '빌드 속도 향상',
      '디자인 통일성 강화',
      '번들 크기 감소',
      '유지보수와 협업에 유리함',
    ], 3),
    makeQuestion('1-1', 3, '이 프로젝트의 협업 중심 도구는 무엇인가?', [
      'Slack',
      'GitHub',
      'Jira',
      'Notion',
    ], 1),
    makeQuestion('1-1', 4, '프로젝트의 모든 작업이 시작되는 최상위 디렉토리는?', [
      'project-root/',
      'root/',
      'src/',
      'main/',
    ], 0),
    makeQuestion('1-1', 5, '.git 디렉토리에 대한 설명으로 올바른 것은?', [
      '직접 수정해야 하는 설정 폴더이다',
      '빌드 결과물이 저장된다',
      '프로젝트의 모든 기록과 히스토리를 담고 있다',
      '배포 환경 설정 파일이 있다',
    ], 2),
  ],
  '1-2': [
    makeQuestion('1-2', 1, 'public/ 폴더에 대한 설명으로 올바른 것은?', [
      'React 컴포넌트만 위치한다',
      '빌드 후에만 접근 가능하다',
      '빌드 과정 없이 그대로 제공되는 정적 자원이 위치한다',
      'API 요청 파일이 위치한다',
    ], 2),
    makeQuestion('1-2', 2, '실제 기능 구현과 화면 개발이 이루어지는 폴더는?', [
      'public/',
      'assets/',
      'src/',
      'styles/',
    ], 2),
    makeQuestion('1-2', 3, 'URL 단위 화면을 구성하는 파일들이 위치하는 폴더는?', [
      'components/',
      'layouts/',
      'pages/',
      'utils/',
    ], 2),
    makeQuestion('1-2', 4, 'API 통신 전용으로 사용하도록 규칙이 정해진 폴더는?', [
      'hooks/',
      'services/',
      'utils/',
      'assets/',
    ], 1),
    makeQuestion('1-2', 5, 'React 앱이 브라우저에 처음 연결되는 파일은?', [
      'App.jsx',
      'index.html',
      'main.jsx',
      'router.jsx',
    ], 2),
  ],
  '1-3': [
    makeQuestion('1-3', 1, '전역 스타일 파일의 위치로 명시된 것은?', [
      'src/assets/global.css',
      'src/styles/global.css',
      'public/styles.css',
      'src/global.css',
    ], 1),
    makeQuestion('1-3', 2, '컴포넌트 단위 스타일 관리 방식으로 사용되는 것은?', [
      'Inline CSS',
      'Styled-components',
      '.module.css',
      'SCSS 전역 파일',
    ], 2),
    makeQuestion('1-3', 3, 'CSS Module을 사용하는 주된 목적은?', [
      '파일 크기 감소',
      '클래스 충돌 방지',
      '로딩 속도 향상',
      '코드 자동 정렬',
    ], 1),
    makeQuestion('1-3', 4, '기능 추가 시 API 로직을 배치해야 하는 폴더는?', [
      'pages/',
      'components/',
      'services/',
      'utils/',
    ], 2),
    makeQuestion('1-3', 5, '팀 코드 배치 규칙에 대한 설명으로 올바른 것은?', [
      '개발자 취향에 따라 자유롭게 배치한다',
      'API 호출은 페이지 파일에 직접 작성한다',
      '팀이 합의한 기준에 따라 폴더를 나눈다',
      '모든 코드는 하나의 폴더에 둔다',
    ], 2),
  ],
  '1-4': [
    makeQuestion('1-4', 1, '.gitignore 파일의 역할은?', [
      'GitHub 이슈를 관리한다',
      'Git에 포함하지 않을 파일을 지정한다',
      '브랜치를 보호한다',
      '커밋 메시지를 정의한다',
    ], 1),
    makeQuestion('1-4', 2, '.gitignore에 포함되어야 하는 항목으로 맞는 것은?', [
      'README.md',
      'src/',
      'node_modules/',
      'package.json',
    ], 2),
    makeQuestion('1-4', 3, '.env 파일을 Git에 올리지 않는 이유는?', [
      '자동 생성 파일이기 때문에',
      '용량이 크기 때문에',
      '민감한 정보가 포함될 수 있기 때문에',
      '필요 없는 파일이기 때문에',
    ], 2),
    makeQuestion('1-4', 4, 'README.md에 포함되는 내용이 아닌 것은?', [
      '프로젝트 개요',
      '실행 방법',
      '협업 규칙',
      '실제 사용자 데이터',
    ], 3),
    makeQuestion('1-4', 5, 'README.md의 주요 목적은?', [
      '빌드 자동화',
      '코드 테스트',
      '프로젝트 안내서 역할',
      '서버 설정 관리',
    ], 2),
  ],
  '1-5': [
    makeQuestion('1-5', 1, 'MongoDB Compass의 주 용도는?', [
      '서버 실행',
      '데이터 시각적 확인',
      'API 호출 테스트',
      '배포 관리',
    ], 1),
    makeQuestion('1-5', 2, '로컬 DB 사용을 위해 설치하는 것은?', [
      'MongoDB Atlas',
      'MongoDB Compass',
      'MongoDB Community Server',
      'Redis',
    ], 2),
    makeQuestion('1-5', 3, '데이터베이스 연결 시 확인해야 할 설정은?', [
      '포트 번호만',
      'MongoDB URI와 DB Name',
      '프론트엔드 환경 변수',
      'GitHub Secrets',
    ], 1),
    makeQuestion('1-5', 4, '문서에 명시된 초기 컬렉션에 포함되지 않은 것은?', [
      'posts',
      'users',
      'comments',
      'counters',
    ], 2),
    makeQuestion('1-5', 5, '더미 데이터의 목적은?', [
      '실제 사용자 데이터 대체',
      '보안 테스트',
      '기능 테스트와 구조 이해',
      '성능 최적화',
    ], 2),
  ],
  '1-6': [
    makeQuestion('1-6', 1, 'GitHub 조직에 합류하기 위해 필요한 단계는?', [
      '브랜치 생성',
      '조직 초대 수락',
      'PR 생성',
      '이슈 작성',
    ], 1),
    makeQuestion('1-6', 2, '로컬 저장소를 초기화하는 명령어는?', [
      'git clone',
      'git start',
      'git init',
      'git create',
    ], 2),
    makeQuestion('1-6', 3, '원격 저장소를 로컬에 연결하는 명령어는?', [
      'git pull',
      'git push',
      'git remote add',
      'git checkout',
    ], 2),
    makeQuestion('1-6', 4, '원격 저장소 연결 상태를 확인하는 명령어는?', [
      'git remote -v',
      'git log',
      'git status',
      'git branch',
    ], 0),
    makeQuestion('1-6', 5, '프론트엔드와 백엔드를 모두 실행해보는 이유는?', [
      '배포를 위해',
      '성능 테스트를 위해',
      '코드 리뷰를 위해',
      '실제 동작 여부를 확인하기 위해',
    ], 3),
  ],
  '1-7': [
    makeQuestion('1-7', 1, '기획 파트의 주요 역할은?', [
      '서버 구현',
      '요구사항 정의 및 문서 작성',
      'UI 컴포넌트 개발',
      '배포 자동화',
    ], 1),
    makeQuestion('1-7', 2, '디자인 파트에서 수행하는 작업으로 올바른 것은?', [
      'API 설계',
      '데이터베이스 설계',
      '통합 테스트',
      'UI/UX 시안 제작',
    ], 3),
    makeQuestion('1-7', 3, '프론트엔드 파트의 역할에 포함되지 않는 것은?', [
      '화면 구현',
      'API 연동',
      '서버 환경 구축',
      '통합 테스트',
    ], 2),
    makeQuestion('1-7', 4, '백엔드 파트의 주요 작업은?', [
      '디자인 시스템 구축',
      'API 및 DB 설계',
      '화면 스타일링',
      '사용자 UX 테스트',
    ], 1),
    makeQuestion('1-7', 5, '모든 직무를 연결하는 중심 문서는?', [
      '기획 문서와 API 명세서',
      '커밋 로그',
      'README.md',
      'GitHub Actions',
    ], 0),
  ],
  '2-1': [
    makeQuestion('2-1', 1, '2주차 작업의 시작으로 가장 먼저 해야 하는 일은?', [
      '새로운 브랜치 생성',
      '최신 코드 받기',
      '커밋 메시지 작성',
      'PR 생성',
    ], 1),
    makeQuestion('2-1', 2, '팀 레포를 내 PC로 복사할 때 사용하는 명령어는?', [
      'git pull',
      'git fetch',
      'git clone',
      'git init',
    ], 2),
    makeQuestion('2-1', 3, '현재 어떤 브랜치에 있는지 확인하는 명령어는?', [
      'git log',
      'git branch',
      'git status',
      'git checkout',
    ], 1),
    makeQuestion('2-1', 4, '원격 저장소(origin)가 연결되어 있는지 확인하는 명령어는?', [
      'git remote -v',
      'git pull',
      'git push',
      'git fetch',
    ], 0),
    makeQuestion('2-1', 5, '기준 브랜치를 최신 상태로 만들기 위한 명령어 조합은?', [
      'git checkout dev → git push origin dev',
      'git branch → git merge dev',
      'git checkout dev → git pull origin dev',
      'git pull → git commit',
    ], 2),
  ],
  '2-2': [
    makeQuestion('2-2', 1, '회사에서 이슈를 반드시 남겨야 하는 이유는?', [
      '커밋 수를 늘리기 위해',
      '무엇을 왜 어떻게 고쳤는지 남기기 위해',
      'GitHub 사용 연습을 위해',
      'PR 생성을 위해',
    ], 1),
    makeQuestion('2-2', 2, '이슈를 만드는 이유로 문서에 포함되지 않은 것은?', [
      '작업 단위 분리',
      '변경 이유 추적',
      '팀원과 맥락 공유',
      '배포 자동화',
    ], 3),
    makeQuestion('2-2', 3, '2주차 실습에서 생성하는 이슈 개수는?', [
      '1개',
      '2개',
      '3개',
      '제한 없음',
    ], 1),
    makeQuestion('2-2', 4, '오늘의 이슈로 올바른 것은?', [
      '로그인 기능 추가',
      '게시물 저장 기능 구현',
      '로고 이미지 교체',
      '서버 배포 설정',
    ], 2),
    makeQuestion('2-2', 5, '이슈 단위로 관리하는 연습의 목적은?', [
      '코드량 증가',
      '리뷰 단순화',
      '협업 흐름 이해',
      '커밋 최소화',
    ], 2),
  ],
  '2-3': [
    makeQuestion('2-3', 1, '문서에서 강조한 작업 원칙은?', [
      '메인 브랜치에서 바로 작업',
      '커밋 후 브랜치 생성',
      '항상 브랜치에서 작업',
      'PR 없이 머지',
    ], 2),
    makeQuestion('2-3', 2, '브랜치 네이밍 규칙으로 올바른 형식은?', [
      'logo-fix',
      '#123-logo',
      'feature/logo-rebrand-#123',
      'dev-logo',
    ], 2),
    makeQuestion('2-3', 3, '브랜치 하나에 대응되는 작업 단위는?', [
      '기능 여러 개',
      '하루 작업량',
      '하나의 이슈',
      '한 주 전체 작업',
    ], 2),
    makeQuestion('2-3', 4, '오타 수정 작업에 사용하는 브랜치 타입은?', [
      'feature',
      'docs',
      'fix',
      'chore',
    ], 2),
    makeQuestion('2-3', 5, '브랜치 작업 흐름을 지키는 주된 이유는?', [
      '코드량 감소',
      '충돌 감소',
      '빌드 속도 개선',
      '커밋 자동화',
    ], 1),
  ],
  '2-4': [
    makeQuestion('2-4', 1, '커밋의 역할로 문서에서 설명한 것은?', [
      '코드 공유',
      '배포 실행',
      '작업 기록 남기기',
      '리뷰 요청',
    ], 2),
    makeQuestion('2-4', 2, '로고 이미지 교체 작업에 사용된 커밋 타입은?', [
      'fix',
      'docs',
      'feat',
      'chore',
    ], 2),
    makeQuestion('2-4', 3, '홈 화면 문구 오타 수정에 사용된 커밋 타입은?', [
      'feat',
      'fix',
      'style',
      'refactor',
    ], 1),
    makeQuestion('2-4', 4, '커밋 메시지에 반드시 포함해야 하는 것은?', [
      '작업자 이름',
      '날짜',
      '이슈 번호',
      '파일 개수',
    ], 2),
    makeQuestion('2-4', 5, 'Conventional Commits를 사용하는 목적은?', [
      '커밋 개수 줄이기',
      '변경 내용 파악 용이',
      '자동 배포 설정',
      '코드 압축',
    ], 1),
  ],
  '2-5': [
    makeQuestion('2-5', 1, '원격 저장소에 브랜치를 올릴 때 사용하는 명령어는?', [
      'git pull',
      'git commit',
      'git push',
      'git merge',
    ], 2),
    makeQuestion('2-5', 2, 'Pull Request의 Base 브랜치는 무엇인가?', [
      'main',
      'feature',
      'fix',
      'dev',
    ], 3),
    makeQuestion('2-5', 3, 'PR 제목은 무엇과 동일하게 작성하는가?', [
      '이슈 제목',
      '브랜치 이름',
      '커밋 메시지',
      '파일명',
    ], 2),
    makeQuestion('2-5', 4, 'PR 본문에 포함해야 할 항목이 아닌 것은?', [
      '변경 요약',
      '전/후 스크린샷',
      '연결 이슈',
      '전체 코드 복사',
    ], 3),
    makeQuestion('2-5', 5, 'PR에서 이슈를 연결할 때 사용하는 표현은?', [
      'Fix #123',
      'Close issue 123',
      'Closes #123',
      'Resolve 123',
    ], 2),
  ],
  '2-6': [
    makeQuestion('2-6', 1, '리뷰 단계에서 확인해야 하는 것은?', [
      '커밋 개수',
      '리뷰어 코멘트와 CI 결과',
      '브랜치 이름',
      '이슈 라벨',
    ], 1),
    makeQuestion('2-6', 2, '리뷰 피드백을 반영할 때 사용하는 방식은?', [
      '새 브랜치 생성',
      '기존 브랜치에 추가 커밋',
      '커밋 삭제',
      'PR 닫기',
    ], 1),
    makeQuestion('2-6', 3, '리뷰 반영 커밋에 사용된 타입은?', [
      'feat',
      'fix',
      'docs',
      'chore',
    ], 3),
    makeQuestion('2-6', 4, '리뷰에 대한 설명으로 올바른 것은?', [
      '개인에 대한 지적이다',
      '필수 절차가 아니다',
      '팀 품질을 높이는 과정이다',
      '자동으로 통과된다',
    ], 2),
    makeQuestion('2-6', 5, '리뷰 반영 후 수행해야 하는 작업은?', [
      'PR 삭제',
      '브랜치 변경',
      '원격으로 다시 push',
      '이슈 재생성',
    ], 2),
  ],
  '2-7': [
    makeQuestion('2-7', 1, '권장되는 머지 방식은?', [
      'Rebase merge',
      'Merge commit',
      'Squash and merge',
      'Fast-forward',
    ], 2),
    makeQuestion('2-7', 2, 'Squash and merge를 사용하는 이유는?', [
      '충돌 방지',
      '자동 배포',
      '커밋 히스토리 간결화',
      '브랜치 보호',
    ], 2),
    makeQuestion('2-7', 3, 'PR에 Closes #이슈번호를 작성하면 발생하는 일은?', [
      '브랜치 자동 삭제',
      '이슈 자동 종료',
      '커밋 취소',
      '리뷰 재요청',
    ], 1),
    makeQuestion('2-7', 4, '머지 후 로컬 브랜치를 삭제하는 명령어는?', [
      'git branch -r',
      'git branch -d 브랜치명',
      'git delete branch',
      'git remove branch',
    ], 1),
    makeQuestion('2-7', 5, '작업 후 브랜치를 정리하는 이유는?', [
      '배포를 위해',
      '저장소 용량 감소',
      '작업 환경을 깔끔하게 유지하기 위해',
      '커밋 수 제한',
    ], 2),
  ],
};
