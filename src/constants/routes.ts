export const ROUTES = {
  MAIN: '/',

  // Auth
  SIGNUP: '/signup',
  SIGNIN: '/signin',

  // 단계별 학습
  COURSES: {
    ROOT: '/courses',
    LECTURE_LIST: (job: string, level: string) => `/courses/${job}/${level}`,
    LECTURE_MAIN: (job: string, level: string, lectureId: string) =>
      `/courses/${job}/${level}/${lectureId}`,
    LECTURE_DETAIL: (job: string, level: string, lectureId: string) =>
      `/courses/${job}/${level}/${lectureId}/detail`,
  },

  // 기초 학습
  BASIC_LEARNING: {
    ROOT: '/learning/basic',
    LECTURE_DETAIL: (lectureId: string) => `/learning/basic/${lectureId}`,
  },

  // 팀 프로젝트
  PROJECTS: '/projects',
} as const;
