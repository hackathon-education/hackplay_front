import { NavItem } from '@/types/navigation';

import { ROUTES } from './routes';

// 내비게이션 메뉴
export const NAV_ITEMS: NavItem[] = [
  { label: '소개', path: ROUTES.MAIN },
  { label: '단계별 학습', path: ROUTES.COURSES.ROOT },
  { label: '기초 학습', path: ROUTES.BASIC_LEARNING.ROOT },
  { label: '랭킹', locked: true },
  { label: '프로젝트 모집', locked: true },
];

// 사용자 드롭다운 메뉴
export const USER_MENU_ITEMS: NavItem[] = [
  { label: '계정설정', path: `${ROUTES.MYPAGE}?tab=settings` },
  // { label: '문의하기' }, // TODO: 문의하기 기능 구현
  { label: '마이페이지', path: ROUTES.MYPAGE },
  { label: '로그아웃' },
] as const;
