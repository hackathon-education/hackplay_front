export interface TeamProjectPracticeTip {
  lessonId: string;
  modifiedFiles: string[];
  addedFiles: string[];
  rules: string[];
}

export const TEAM_PROJECT_PRACTICE_TIPS: Record<string, TeamProjectPracticeTip> = {
  '3-1': {
    lessonId: '3-1',
    modifiedFiles: ['src/App.jsx'],
    addedFiles: [
      'src/components/AuthPage/AuthPage.jsx',
      'src/components/AuthForm/AuthForm.jsx',
    ],
    rules: [
      '먼저 App.jsx를 열고 /auth 라우트를 추가해야 한다. 이걸 안 하면 아무리 컴포넌트를 만들어도 화면에 안 나온다.',
      'AuthPage.jsx는 “화면 전체 틀”이다. 여기에는 입력창을 만들지 말고, 로그인/회원가입 폼이 들어갈 자리만 만든다.',
      '실제 로그인/회원가입 전환은 AuthForm.jsx에서 한다.',
      '정리하면 App.jsx는 어떤 페이지로 갈지 결정하고, AuthPage는 화면 틀을 만들고, AuthForm은 로그인/회원가입 전환을 담당한다.',
      '이 3단 구조를 이해하면 절반은 성공이다.',
    ],
  },
  '3-2': {
    lessonId: '3-2',
    modifiedFiles: [],
    addedFiles: ['src/components/AuthForm/Signup.jsx'],
    rules: [
      'Signup.jsx를 열고 입력창 4개를 만든다: name, email, password, confirmPassword.',
      '각 input에는 반드시 value={state값}와 onChange={핸들러}가 있어야 한다. 없으면 React 상태 관리가 안 된다.',
      '버튼은 아직 API 연결 안 해도 된다. 먼저 화면부터 완성한다.',
    ],
  },
  '3-3': {
    lessonId: '3-3',
    modifiedFiles: ['src/components/AuthForm/Signup.jsx'],
    addedFiles: [],
    rules: [
      '입력이 바뀔 때마다 “이 폼이 유효한지” 계산해야 한다.',
      '마지막에 const isFormValid = 조건1 && 조건2 && 조건3 형태가 있어야 한다.',
      '버튼에는 반드시 disabled={!isFormValid}가 들어가야 한다.',
      '핵심은 “조건을 여러 개 따로 관리하지 말고, 하나의 최종 값으로 정리하라”이다.',
    ],
  },
  '3-4': {
    lessonId: '3-4',
    modifiedFiles: ['src/components/AuthForm/Signup.jsx'],
    addedFiles: [],
    rules: [
      'handleSubmit 안에서 fetch를 작성한다.',
      '버튼을 누르면 로딩 상태 true → API 호출 → 성공 시 로그인 화면으로 전환 → 실패 시 에러 메시지 표시 → 마지막에 로딩 false 흐름으로 처리한다.',
      '로딩 중에는 버튼을 다시 누를 수 없게 해야 한다.',
      '반드시 isLoading 상태를 만들어라.',
    ],
  },
  '3-5': {
    lessonId: '3-5',
    modifiedFiles: [],
    addedFiles: ['src/components/AuthForm/Login.jsx'],
    rules: [
      '로그인도 Signup과 같은 방식으로 만든다: email, password.',
      'Enter 키를 누르면 로그인되도록 처리한다.',
      '구조는 회원가입과 최대한 비슷하게 유지한다. 패턴이 같아야 코드가 깔끔해진다.',
    ],
  },
  '3-6': {
    lessonId: '3-6',
    modifiedFiles: [
      'src/components/AuthForm/Login.jsx',
      'src/api/http.js',
      'src/components/SideBar.jsx',
    ],
    addedFiles: [],
    rules: [
      '로그인 성공 시 localStorage.setItem("token", result.token)를 실행한다.',
      'http.js에서 모든 요청에 자동으로 Authorization:Bearer 토큰이 붙도록 만든다.',
      '컴포넌트에서 직접 헤더를 붙이지 않는다.',
      'API 로직은 api 폴더에만 둔다.',
      '토큰은 “저장”과 “자동 첨부”가 세트다.',
    ],
  },
  '3-7': {
    lessonId: '3-7',
    modifiedFiles: [
      'src/components/AuthForm/Login.jsx',
      'src/components/AuthForm/AuthForm.jsx',
    ],
    addedFiles: [],
    rules: [
      '실패하면 페이지 이동하지 말고, 현재 화면에 에러 메시지만 보여준다.',
      '회원가입 성공 시 바로 메인으로 보내지 말고, 로그인 화면으로 전환하는 흐름을 유지한다.',
      '입력/검증/호출은 각 폼이 담당하고, 화면 전환은 AuthForm이 담당한다.',
    ],
  },
  '4-1': {
    lessonId: '4-1',
    modifiedFiles: ['src/components/FeedPosts/FeedPost.jsx'],
    addedFiles: [],
    rules: [
      'FeedPost.jsx에 저장 아이콘을 추가한다.',
      '아직 API 연결하지 않는다. 먼저 클릭하면 아이콘이 바뀌는지부터 확인한다.',
      '카드 UI는 FeedPost가 책임진다.',
    ],
  },
  '4-2': {
    lessonId: '4-2',
    modifiedFiles: [
      'src/components/FeedPosts/FeedPost.jsx',
      'src/components/FeedPosts/FeedPosts.jsx',
    ],
    addedFiles: [],
    rules: [
      '클릭하면 즉시 아이콘 상태를 바꾼다.',
      'API가 실패하면 이전 상태로 되돌린다.',
      '실제 저장 상태는 부모(FeedPosts.jsx)에서 관리한다.',
      '“즉시 변경 → 실패 시 롤백” 이 구조가 핵심이다.',
    ],
  },
  '4-3': {
    lessonId: '4-3',
    modifiedFiles: ['src/components/FeedPosts/FeedPosts.jsx'],
    addedFiles: ['src/api/saved.js'],
    rules: [
      'src/api/saved.js에 fetch 코드를 작성한다.',
      '컴포넌트에서는 savePost(), unsavePost() 같은 함수만 호출한다.',
      'fetch를 컴포넌트 안에 직접 작성하지 않는다.',
    ],
  },
  '4-4': {
    lessonId: '4-4',
    modifiedFiles: [
      'src/api/saved.js',
      'src/components/FeedPosts/FeedPosts.jsx',
    ],
    addedFiles: [],
    rules: [
      'toggle 함수 하나에서 true → 저장, false → 해제를 처리한다.',
      '실패 시 반드시 상태를 원래대로 되돌린다.',
    ],
  },
  '4-5': {
    lessonId: '4-5',
    modifiedFiles: ['src/api/saved.js'],
    addedFiles: [],
    rules: [
      '저장 버튼 누르기 전에 토큰이 있는지 확인한다.',
      '토큰이 없으면 /auth로 이동시킨다.',
      '인증 방식은 프로젝트 전체에서 동일해야 한다.',
    ],
  },
  '4-6': {
    lessonId: '4-6',
    modifiedFiles: [
      'src/components/ProfilePage/ProfilePage.jsx',
      'src/components/Profile/ProfileTab.jsx',
    ],
    addedFiles: [
      'src/components/Profile/SavedMinimal.jsx',
      'src/pages/profile/SavedPosts.jsx',
    ],
    rules: [
      '현재 탭 상태는 ProfilePage.jsx에서 관리한다.',
      'ProfileTab.jsx는 버튼만 담당한다.',
      'Saved 화면은 기존 게시물 목록과 비슷한 구조로 만든다.',
    ],
  },
  '4-7': {
    lessonId: '4-7',
    modifiedFiles: [
      'src/components/FeedPosts/FeedPosts.jsx',
      'src/components/Profile/SavedMinimal.jsx',
      'src/components/ProfilePage/SavedPosts.jsx',
    ],
    addedFiles: [],
    rules: [
      '데이터를 불러올 때는 로딩, 성공, 에러, 데이터 없음 이 네 가지를 구분한다.',
      '낙관적 업데이트를 썼다면 실패 시 롤백이 반드시 있어야 한다.',
      '“동작한다”가 아니라 “모든 상황에서 자연스럽다”가 목표다.',
    ],
  },
};
