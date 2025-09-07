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
