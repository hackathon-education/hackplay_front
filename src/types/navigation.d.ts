// 내비게이션 아이템 타입
export interface NavItem {
  label: string;
  path?: string;
  locked?: boolean; // 잠금 여부
}
