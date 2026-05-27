import { signOut } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';

/** 서버 세션(쿠키) 만료 후 클라이언트 인증 상태를 정리합니다. */
export async function endAuthSession(): Promise<void> {
  try {
    await signOut();
  } catch (error) {
    console.error('로그아웃 실패:', error);
  } finally {
    useAuthStore.getState().logout();
  }
}
