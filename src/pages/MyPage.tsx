import JobIcon from '@/assets/auth/briefcase-icon.svg?react';
import CheckIcon from '@/assets/common/check-icon.svg?react';
import ErrorIcon from '@/assets/common/close-icon.svg?react';
import BookIcon from '@/assets/lecture/book-icon.svg?react';
import CalendarIcon from '@/assets/lecture/calendar-icon.svg?react';
import TeamMembersIcon from '@/assets/lecture/team-members-icon.svg?react';
import TimeIcon from '@/assets/lecture/time-icon.svg?react';
import TriangleRightIcon from '@/assets/lecture/triangle-right-icon.svg?react';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { toast } from 'sonner';

import { axiosInstance } from '@/api/axios';
import { LearningLecture } from '@/api/learning';
import { changeMyPassword, withdrawMember } from '@/api/member';
import RecentThumbnail from '@/assets/common/main-character-group.webp';
import DesignerThumbnail from '@/assets/designer.png';
import StarRatingIcon from '@/assets/lecture/star-rating-icon.webp';
import MypageBg from '@/assets/mypage/mypage-bg.webp';
import SearchIcon from '@/assets/mypage/search-icon.webp';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import CategoryBadge from '@/components/lecture/CategoryBadge';
import PasswordConfirmModal from '@/components/mypage/PasswordConfirmModal';
import WithdrawModal from '@/components/mypage/WithdrawModal';
import { DIFFICULTY_LABELS, JOB_TYPES, JobKey } from '@/constants/jobTypes';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';
import { endAuthSession } from '@/utils/authSession';

type TabKey = 'settings' | 'payments' | 'history' | 'withdraw';

const TAB_LABEL: Record<TabKey, string> = {
  settings: '설정',
  payments: '결제 내역',
  history: '학습 이력',
  withdraw: '회원탈퇴',
};

const TAB_DESC: Record<TabKey, string> = {
  settings: '개인정보 및 계정 보안 설정을 변경할 수 있어요.',
  payments: '결제 내역은 MVP 범위에서 제공하지 않아요.',
  history: '최근 학습 강의와 진행 현황을 확인할 수 있어요.',
  withdraw: '계정 탈퇴 전 꼭 확인해 주세요.',
};

function getTabFromSearch(tabParam: string | null): TabKey {
  if (tabParam === 'payments' || tabParam === 'history' || tabParam === 'withdraw') return tabParam;
  return 'settings';
}

function formatRole(role: JobKey | null | undefined) {
  if (!role) return '-';
  return JOB_TYPES[role] ?? role;
}

function formatRating(rating?: number) {
  if (typeof rating !== 'number') return '-';
  return Math.max(0, Math.min(5, rating)).toFixed(1);
}

function formatDateLabel(iso?: string) {
  if (!iso) return '-';
  const date = new Date(iso);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const twoDigits = (value: number) => `${value < 10 ? '0' : ''}${value}`;
  return `${date.getFullYear()}년 ${twoDigits(month)}월 ${twoDigits(day)}일`;
}

function formatStudyDuration(minutes?: number) {
  if (!minutes) return '0시간 0분';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}시간 ${mins}분`;
}

function getInitials(name?: string) {
  if (!name) return '강';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2);
  return `${parts[0][0]}${parts[1][0]}`;
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-badge-bg px-3 py-1 text-xs font-semibold text-text-accent shadow-1">
    {children}
  </span>
);

const DUMMY_LEARNING_LIST: LearningLecture[] = [
  {
    lectureId: 'course-1',
    title: '기업페이지 및 관리자페이지 제작',
    description:
      '현업에서 즉시 사용 가능한 디자인 시스템을 처음부터 끝까지 구축해봅니다. 토큰 설계부터 컴포넌트 라이브러리 제작까지 심도 있게 다룹니다.',
    position: 'FRONTEND',
    rating: 4.9,
    thumbnailUrl: RecentThumbnail,
    status: 'IN_PROGRESS',
    startedAt: '2025-05-17T00:00:00Z',
    teamCount: 8,
    lastStudiedAt: '2025-10-17T14:30:00Z',
    resumeLectureId: 'course-1',
    instructorName: '조은영',
    progressRate: 25,
  },
  {
    lectureId: 'course-2',
    title: 'UI/UX 디자인 시스템 구축하기',
    description: '디자인 원칙부터 컴포넌트 라이브러리까지 실무형 디자인 시스템을 완성합니다.',
    position: 'FRONTEND',
    rating: 4.9,
    thumbnailUrl: DesignerThumbnail,
    status: 'COMPLETED',
    startedAt: '2025-08-19T00:00:00Z',
    teamCount: 3,
    lastStudiedAt: '2025-10-10T11:20:00Z',
    resumeLectureId: 'course-2',
    instructorName: '이름',
    difficulty: 'INTERMEDIATE',
    progressRate: 35,
    studyDurationMinutes: 270,
  },
  {
    lectureId: 'course-3',
    title: 'React Native 실전 프로젝트',
    description: '모바일 앱 개발의 핵심 흐름을 실습 중심으로 익힙니다.',
    position: 'FRONTEND',
    rating: 4.8,
    status: 'IN_PROGRESS',
    startedAt: '2025-09-10T00:00:00Z',
    teamCount: 5,
    lastStudiedAt: '2025-09-27T09:15:00Z',
    resumeLectureId: 'course-3',
    instructorName: '김소영',
    difficulty: 'BEGINNER',
    progressRate: 55,
    studyDurationMinutes: 730,
  },
  {
    lectureId: 'course-4',
    title: '백엔드 서버 성능 최적화 심화',
    description: '고성능 서버 설계와 안정적인 서비스 운영 노하우를 다룹니다.',
    position: 'BACKEND',
    rating: 5.0,
    status: 'COMPLETED',
    startedAt: '2025-08-05T00:00:00Z',
    teamCount: 2,
    lastStudiedAt: '2025-09-15T17:40:00Z',
    resumeLectureId: 'course-4',
    instructorName: '이현수',
    difficulty: 'ADVANCED',
    progressRate: 25,
    studyDurationMinutes: 525,
  },
  {
    lectureId: 'course-5',
    title: '피그마로 시작하는 웹 디자인',
    description: '웹 인터페이스 디자인의 기본과 실전 템플릿을 함께 완성합니다.',
    position: 'DESIGN',
    rating: 4.7,
    status: 'IN_PROGRESS',
    startedAt: '2025-07-22T00:00:00Z',
    teamCount: 4,
    lastStudiedAt: '2025-09-05T13:05:00Z',
    resumeLectureId: 'course-5',
    instructorName: '한유진',
    difficulty: 'ADVANCED',
    progressRate: 75,
    studyDurationMinutes: 990,
  },
];

const MyPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { user, login } = useAuthStore();

  const activeTab = useMemo(() => getTabFromSearch(searchParams.get('tab')), [searchParams]);

  // Profile
  const [profileLoading, setProfileLoading] = useState(false);
  const [profile, setProfile] = useState<{
    nickname: string;
    email: string;
    role: JobKey;
  }>(() => ({
    nickname: user?.nickname ?? '',
    email: user?.email ?? '',
    role: user?.role ?? 'FRONT',
  }));

  // Learning
  const [learningLoading, setLearningLoading] = useState(false);
  const [learningList, setLearningList] = useState<LearningLecture[]>([]);
  const [historyFilter, setHistoryFilter] = useState<'ALL' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');

  // Email verification (same flow as signup)
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyCodeError, setVerifyCodeError] = useState('');

  // Password confirm modal
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [pwModalTitle, setPwModalTitle] = useState('');
  const [pwModalDesc, setPwModalDesc] = useState<string | undefined>(undefined);
  const [pwModalConfirmText, setPwModalConfirmText] = useState('');
  const [pendingAction, setPendingAction] = useState<null | 'CHANGE_PASSWORD'>(null);

  // Withdraw modal
  const [withdrawModalOpen, setWithdrawModalOpen] = useState(false);

  // Forms
  const {
    register: registerSettings,
    watch: watchSettings,
    formState: { errors: settingsErrors },
    reset: resetSettings,
  } = useForm<{ nickname: string; email: string; role: JobKey }>({
    mode: 'onChange',
    defaultValues: profile,
  });

  const currentSettings = {
    nickname: watchSettings('nickname'),
    email: watchSettings('email'),
    role: watchSettings('role'),
  };

  const saveSettingsField = (field: 'nickname' | 'email' | 'role') => {
    const value = currentSettings[field];

    if (field === 'email' && value !== profile.email && !isCodeVerified) {
      toast.error('이메일 변경 시 인증을 완료해주세요.');
      return;
    }

    if (value === profile[field]) {
      toast('변경 사항이 없어요.');
      return;
    }

    if (field === 'nickname' && settingsErrors.nickname) {
      toast.error(settingsErrors.nickname.message ?? '닉네임을 확인해주세요.');
      return;
    }

    const updatedProfile = {
      ...profile,
      [field]: value,
    };

    setProfile(updatedProfile);
    resetSettings(updatedProfile);
    setIsCodeSent(false);
    setIsCodeVerified(false);
    setVerifyCode('');
    setVerifyCodeError('');

    toast.success('변경 사항이 저장되었습니다.');
  };

  const {
    register: registerWithdraw,
    handleSubmit: handleSubmitWithdraw,
    watch: watchWithdraw,
    formState: { errors: withdrawErrors, isValid: withdrawIsValid },
    reset: resetWithdraw,
  } = useForm<{ password: string; confirmPassword: string }>({
    mode: 'onChange',
  });

  // const fetchProfile = async () => {
  //   setProfileLoading(true);
  //   try {
  //     // const res = await getMyProfile();
  //     if (res.code === 200 && res.data) {
  //       setProfile({
  //         nickname: res.data.nickname,
  //         email: res.data.email,
  //         role: res.data.role,
  //       });

  //       // store also used across app header etc.
  //       login({
  //         nickname: res.data.nickname,
  //         email: res.data.email,
  //         profileImageUrl: res.data.profileImageUrl,
  //         role: res.data.role,
  //       });
  //     }
  //   } catch (e: any) {
  //     // API가 아직 준비되지 않았어도 UI는 동작하도록 로컬 유저로 fallback
  //     if (!user) toast.error('사용자 정보를 불러오지 못했습니다.');
  //   } finally {
  //     setProfileLoading(false);
  //   }
  // };

  useEffect(() => {
    if (!learningList.length) {
      setLearningList(DUMMY_LEARNING_LIST);
    }
  }, [learningList.length]);

  useEffect(() => {
    if (!isCodeSent || isCodeVerified || !verifyCode) return;
    if (/[^a-zA-Z0-9]/.test(verifyCode)) {
      setVerifyCodeError('인증코드는 영문자와 숫자만 입력할 수 있습니다.');
      return;
    }
    if (!/^[a-zA-Z0-9]{6}$/.test(verifyCode)) {
      setVerifyCodeError('인증코드는 6자리 영숫자입니다.');
      return;
    }
    setVerifyCodeError('');
  }, [verifyCode, isCodeSent, isCodeVerified]);

  const openPasswordModalFor = (action: 'CHANGE_PASSWORD', title: string) => {
    setPendingAction(action);
    setPwModalTitle(title);
    setPwModalDesc('아래 항목에 정보를 입력해주세요.');
    setPwModalConfirmText('비밀번호 변경하기');
    setPwModalOpen(true);
  };

  const handlePasswordConfirm = async (
    currentPassword: string,
    newPassword: string,
    checkNewPassword: string,
  ) => {
    if (!pendingAction) return;
    try {
      if (pendingAction === 'CHANGE_PASSWORD') {
        const res = await changeMyPassword({
          currentPassword,
          newPassword,
          checkNewPassword,
        });
        if (res.code !== 200) throw new Error(res.message);
        toast.success('비밀번호를 변경했습니다.');
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? e?.message ?? '요청 처리에 실패했습니다.');
      throw e;
    } finally {
      setPendingAction(null);
    }
  };

  const handleSendEmailCode = async (nextEmail: string) => {
    if (!nextEmail) return;
    setIsSendingCode(true);
    try {
      const check = await axiosInstance.post('/v1/email/check', {
        email: nextEmail,
      });
      if (check.data?.data === 'Y') {
        toast.error('이미 사용 중인 이메일입니다.');
        return;
      }

      await axiosInstance.post('/v1/email/send', { email: nextEmail });
      toast.success('인증코드가 전송되었습니다.');
      setIsCodeSent(true);
      setIsCodeVerified(false);
      setVerifyCode('');
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? '인증코드 전송 중 오류가 발생했습니다.');
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyEmailCode = async (nextEmail: string) => {
    if (!nextEmail || verifyCodeError || !verifyCode) return;
    setIsVerifyingCode(true);
    try {
      const res = await axiosInstance.post('/v1/email/verify', {
        email: nextEmail,
        verifyCode,
      });
      if (res.data?.code === 200) {
        setIsCodeVerified(true);
        toast.success('이메일 인증이 완료되었습니다.');
        // 인증 완료 후 자동으로 저장
        const updatedProfile = {
          ...profile,
          email: nextEmail,
        };
        setProfile(updatedProfile);
        resetSettings(updatedProfile);
        setIsCodeSent(false);
        setVerifyCode('');
        setVerifyCodeError('');
        toast.success('이메일이 변경되었습니다.');
      } else {
        toast.error(res.data?.message ?? '인증에 실패했습니다.');
      }
    } catch (e: any) {
      setVerifyCodeError(e?.response?.data?.message ?? '인증 실패');
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const onSubmitWithdraw: SubmitHandler<{ password: string; confirmPassword: string }> = async (
    data,
  ) => {
    if (data.password !== data.confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await withdrawMember({ password: data.password });
      toast.success('탈퇴 처리되었습니다.');
      await endAuthSession();
      resetWithdraw();
      navigate(ROUTES.MAIN);
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? '탈퇴 처리에 실패했습니다.');
    }
  };

  const handleWithdraw = async (email: string, password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (email !== profile.email) {
      toast.error('입력한 이메일이 일치하지 않습니다.');
      return;
    }

    // 확인 alert
    const isConfirmed = window.confirm(
      '정말로 계정을 탈퇴하시겠습니까?\n탈퇴 후 모든 데이터는 복구할 수 없습니다.',
    );
    if (!isConfirmed) {
      return;
    }

    try {
      await withdrawMember();
      toast.success('탈퇴 처리되었습니다.');
      await endAuthSession();
      navigate(ROUTES.MAIN);
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? '탈퇴 처리에 실패했습니다.');
    }
  };

  const recentLearning = useMemo(() => {
    const copy = [...learningList];
    copy.sort((a, b) => {
      const at = a.lastStudiedAt ? new Date(a.lastStudiedAt).getTime() : 0;
      const bt = b.lastStudiedAt ? new Date(b.lastStudiedAt).getTime() : 0;
      return bt - at;
    });
    return copy[0];
  }, [learningList]);

  const filteredLearning = useMemo(() => {
    const list = recentLearning
      ? learningList.filter((lecture) => lecture.lectureId !== recentLearning.lectureId)
      : learningList;

    if (historyFilter === 'ALL') return list;
    return list.filter((l) => l.status === historyFilter);
  }, [learningList, historyFilter, recentLearning]);

  const goResume = (lecture: LearningLecture) => {
    const id = lecture.resumeLectureId ?? lecture.lectureId;
    navigate(ROUTES.WORKSPACE(id));
  };

  const SidebarItem = ({ tab }: { tab: TabKey }) => {
    const selected = tab === activeTab;
    return (
      <button
        type="button"
        onClick={() => setSearchParams({ tab })}
        className={`
          relative flex w-full items-center justify-center py-5 text-base font-bold transition-all
          ${
            selected
              ? 'z-10 -mr-[1px] rounded-l-[32px] border border-card-border border-r-transparent bg-white text-text-accent'
              : 'text-text-body hover:text-text-title'
          }
        `}
      >
        {TAB_LABEL[tab]}
      </button>
    );
  };

  return (
    <div className="relative min-h-screen lg:min-h-[2353px] overflow-hidden -mx-[15px] lg:-mx-5 -mt-16.5 lg:-mt-24">
      <img
        src={MypageBg}
        alt=""
        className="absolute inset-0 z-0 h-full w-full object-cover 2xl:h-auto"
      />

      <div className="relative z-base mx-auto w-full max-w-[1703px] px-4 sm:px-[15px] lg:px-5 pt-16 lg:pt-[175px] pb-12 sm:pb-16 lg:pb-20">
        <PasswordConfirmModal
          isOpen={pwModalOpen}
          title={pwModalTitle}
          description={pwModalDesc}
          confirmText={pwModalConfirmText}
          onClose={() => setPwModalOpen(false)}
          onConfirm={handlePasswordConfirm}
        />

        <WithdrawModal
          isOpen={withdrawModalOpen}
          onClose={() => setWithdrawModalOpen(false)}
          onConfirm={handleWithdraw}
        />

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="w-full shrink-0 lg:w-[113px]">
            <div className="flex flex-row overflow-hidden rounded-t-20 border border-b-0 border-tab-border-default lg:flex-col lg:rounded-l-20 lg:rounded-tr-none lg:border-b lg:border-r-0 divide-x divide-tab-border-default lg:divide-x-0 lg:divide-y">
              {(['settings', 'payments', 'history', 'withdraw'] as TabKey[]).map((tab) => {
                const selected = tab === activeTab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => {
                      if (tab === 'withdraw') {
                        setWithdrawModalOpen(true);
                      } else {
                        setSearchParams({ tab });
                      }
                    }}
                    className={`relative flex min-h-11 flex-1 items-center justify-center px-1 py-2.5 text-xs leading-tight transition-all sm:py-3 sm:text-sm lg:flex-none lg:py-3.5 ${
                      selected
                        ? 'z-nav bg-white text-tab-text-active'
                        : 'bg-tab-bg-default text-tab-text-default hover:text-tab-text-hover'
                    }`}
                  >
                    {TAB_LABEL[tab]}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Content Area */}
          <section className="relative min-w-0 flex-1">
            <div className="min-h-0 rounded-b-20 rounded-t-none border border-card-border bg-tab-bg-default p-4 sm:p-6 md:p-8 lg:min-h-[538px] lg:rounded-20 lg:rounded-tl-none lg:border-l-0 lg:p-[55px]">
              <div
                className={`${activeTab === 'settings' ? 'mx-auto w-full max-w-[299px]' : 'w-full'}`}
              >
                <h2 className="text-xl text-text-accent leading-[1.2] sm:text-2xl">
                  {TAB_LABEL[activeTab]}
                </h2>

                {/* Settings */}
                {activeTab === 'settings' && (
                  <div className="mt-6 flex flex-col gap-6 sm:mt-8 sm:gap-8 lg:mt-[35px] lg:gap-[35px]">
                    <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[35px] lg:pr-[13px]">
                      <div className="flex flex-col gap-[7px]">
                        <label className="text-sm text-text-base leading-tight">닉네임</label>
                        <div className="flex min-w-0 items-center gap-2">
                          <Input
                            iconType="nickname"
                            iconSize="w-5.5 h-auto -translate-x-[2px]"
                            maxLength={30}
                            {...registerSettings('nickname', {
                              required: '닉네임을 입력해주세요',
                              minLength: {
                                value: 2,
                                message: '닉네임은 최소 2자 이상이어야 합니다.',
                              },
                            })}
                            className={`min-w-0 flex-1 ${
                              settingsErrors.nickname
                                ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                                : ''
                            }`}
                          />
                          <Button
                            type="button"
                            size="w53h35"
                            rounded="xs"
                            className="shrink-0"
                            onClick={() => saveSettingsField('nickname')}
                            disabled={
                              !!settingsErrors.nickname ||
                              currentSettings.nickname === profile.nickname
                            }
                          >
                            수정
                          </Button>
                        </div>
                        {settingsErrors.nickname && (
                          <div className="flex text-text-error ml-[17px] items-center gap-1">
                            <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
                            <span className="text-sm leading-tight">
                              {settingsErrors.nickname.message}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-[7px]">
                        <label className="text-sm text-text-base leading-tight">이메일</label>
                        <div className="flex min-w-0 items-center gap-2">
                          <Input
                            type="email"
                            iconType="email"
                            iconSize="w-4.5 h-auto"
                            {...registerSettings('email', { required: '이메일을 입력해주세요' })}
                            className={`min-w-0 flex-1 ${
                              settingsErrors.email
                                ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                                : ''
                            }`}
                          />
                          <Button
                            type="button"
                            size="w53h35"
                            rounded="xs"
                            className="shrink-0"
                            disabled={isSendingCode || currentSettings.email === profile.email}
                            onClick={() => handleSendEmailCode(currentSettings.email)}
                          >
                            {isSendingCode ? '...' : '수정'}
                          </Button>
                        </div>
                        {isCodeSent && (
                          <div className="flex flex-col gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                              <Input
                                iconType="verifyCode"
                                iconSize="w-4.5 h-auto"
                                placeholder="인증코드 6자리"
                                maxLength={6}
                                value={verifyCode}
                                disabled={isCodeVerified}
                                onChange={(e) => setVerifyCode(e.target.value)}
                                className={`min-w-0 flex-1 ${
                                  verifyCodeError
                                    ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                                    : ''
                                }`}
                              />
                              <Button
                                type="button"
                                disabled={
                                  !verifyCode ||
                                  !!verifyCodeError ||
                                  isVerifyingCode ||
                                  isCodeVerified
                                }
                                onClick={() => handleVerifyEmailCode(currentSettings.email)}
                                size="w53h35"
                                rounded="xs"
                                className={`shrink-0 text-sm ${isCodeVerified ? '!font-semibold' : ''}`}
                              >
                                {isCodeVerified ? '인증완료' : isVerifyingCode ? '...' : '확인'}
                              </Button>
                            </div>
                            {verifyCodeError && (
                              <div className="flex text-text-error ml-[17px] items-center gap-1">
                                <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
                                <span className="text-sm leading-tight">{verifyCodeError}</span>
                              </div>
                            )}
                            {isCodeVerified && (
                              <div className="flex text-text-accent ml-[17px] items-center gap-1">
                                <CheckIcon className="stroke-current stroke-[1.5px]" />
                                <span className="text-sm leading-tight">
                                  이메일 인증이 완료되었습니다.
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-[7px]">
                        <label className="text-sm text-text-base leading-tight">희망 직무</label>
                        <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                          <div className="relative min-w-0 w-full sm:flex-1">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                              <JobIcon className="text-text-base w-4.5 -translate-x-[1px]" />
                            </div>

                            <select
                              {...registerSettings('role', { required: '직무를 선택해 주세요.' })}
                              className={`
        w-full h-12.5 rounded-2xl border border-input-default-border bg-input-default-bg 
        pl-[43px] pr-10 text-sm font-semibold outline-none appearance-none 
        focus:border-input-focus-border focus:ring-1 focus:ring-input-focus-ring transition-all
        ${settingsErrors.role ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border' : ''}
      `}
                            >
                              <option value="" hidden>
                                직무를 선택해 주세요.
                              </option>
                              <option value="PLAN">기획</option>
                              <option value="DESIGN">디자인</option>
                              <option value="FRONT">{JOB_TYPES.FRONT}</option>
                              <option value="BACK">{JOB_TYPES.BACK}</option>
                            </select>
                          </div>
                          <Button
                            type="button"
                            size="w53h35"
                            rounded="xs"
                            className="shrink-0 self-start sm:self-center"
                            onClick={() => saveSettingsField('role')}
                            disabled={currentSettings.role === profile.role}
                          >
                            수정
                          </Button>
                        </div>
                        {settingsErrors.role && (
                          <div className="flex items-center gap-1 text-text-error ml-[17px]">
                            <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
                            <span className="text-sm leading-tight">
                              {settingsErrors.role.message}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <Button
                      type="button"
                      onClick={() => openPasswordModalFor('CHANGE_PASSWORD', '비밀번호 변경')}
                      size="w155h35"
                      rounded="xs"
                      className="self-end"
                    >
                      비밀번호 변경하기
                    </Button>
                  </div>
                )}

                {/* Payments */}
                {activeTab === 'payments' && (
                  <div className="mt-6 rounded-3xl border border-card-border bg-card-bg p-6 text-center sm:mt-8 sm:p-10">
                    <p className="text-text-body">결제 내역 기능은 준비 중입니다.</p>
                  </div>
                )}

                {/* History */}
                {activeTab === 'history' && (
                  <div className="mt-4 flex flex-col gap-6 sm:mt-5 sm:gap-8">
                    <div className="flex flex-col items-start overflow-hidden rounded-20 border border-card-border bg-gradient-hero p-4 shadow-2 sm:rounded-30 sm:p-6 lg:flex-row lg:p-10">
                      <div className="relative aspect-[613/416] w-full shrink-0 overflow-hidden rounded-20 border border-banner-border shadow-1 sm:rounded-30 lg:w-[min(100%,613px)]">
                        {recentLearning?.thumbnailUrl ? (
                          <>
                            <img
                              src={recentLearning.thumbnailUrl}
                              className="h-full w-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-banner-glass backdrop-blur-[4px]" />
                          </>
                        ) : (
                          <div
                            className="h-full w-full"
                            style={{
                              background:
                                'linear-gradient(180deg, #A855F7 0%, rgba(99, 102, 241, 0.00) 159%)',
                            }}
                          />
                        )}
                        {recentLearning && (
                          <button
                            onClick={() => goResume(recentLearning)}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/60 bg-white/40 sm:h-24 sm:w-24 lg:h-30 lg:w-30">
                              <TriangleRightIcon className="h-8 w-8 translate-x-[4px] text-white sm:h-10 sm:w-10 sm:translate-x-[6px] lg:h-11 lg:w-11" />
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="flex w-full flex-1 flex-col items-start justify-between p-4 pt-4 sm:p-6 sm:pt-5 lg:p-[35px] lg:pt-0">
                        <CategoryBadge>{recentLearning?.position ?? 'FRONTEND'}</CategoryBadge>

                        <div className="w-full">
                          <h3 className="mt-3 text-xl font-semibold leading-snug text-text-accent break-keep sm:mt-[13px] sm:text-2xl md:text-3xl lg:text-5xl lg:leading-[1.2]">
                            {recentLearning?.title}
                          </h3>
                          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm leading-tight text-text-base sm:mt-[13px] sm:gap-5">
                            <div className="flex items-center gap-2">
                              <CalendarIcon />
                              <span>시작일: {formatDateLabel(recentLearning?.startedAt)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <TeamMembersIcon className="w-3.5 h-auto" />
                              <span>
                                {recentLearning?.teamCount != null
                                  ? `${recentLearning.teamCount} Team Members`
                                  : '-'}
                              </span>
                            </div>
                          </div>
                          <p className="mt-6 text-sm leading-relaxed text-text-base sm:mt-10 sm:text-base lg:mt-[51px] lg:text-xl lg:leading-tight">
                            {recentLearning?.description}
                          </p>
                          {recentLearning?.progressRate != null && (
                            <div className="mt-6 w-full self-end sm:mt-8 lg:mt-25">
                              <div className="flex flex-wrap items-center justify-between gap-2 text-sm leading-[1.2] text-text-body sm:gap-3 sm:text-base lg:text-xl">
                                <span>진도율 {recentLearning.progressRate}%</span>
                                <p className="mr-[11px]">
                                  {recentLearning.progressRate >= 100
                                    ? '완료된 강의입니다.'
                                    : `${Math.max(1, 5 - Math.floor(recentLearning.progressRate / 26))}강 남음`}
                                </p>
                              </div>
                              <div className="mt-[9px] h-[15px] overflow-hidden rounded-20 bg-[rgba(var(--neutral-180-rgb),0.13)] border border-text-body/20 shadow-7">
                                <div
                                  className="h-full rounded-20 bg-primary-500 border border-card-border"
                                  style={{
                                    width: `${Math.min(100, Math.max(0, recentLearning.progressRate))}%`,
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex w-full flex-wrap gap-2 rounded-20 border border-chip-default-border bg-white p-2 shadow-3 sm:w-fit sm:gap-[9px] sm:rounded-30 sm:p-2.5">
                      {(['ALL', 'IN_PROGRESS', 'COMPLETED'] as const).map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setHistoryFilter(filter)}
                          className={`flex-1 rounded-50 px-3 py-2 text-sm leading-none transition sm:flex-none sm:px-4 sm:py-[9px] sm:text-base lg:text-xl ${
                            historyFilter === filter
                              ? 'bg-chip-active-bg text-chip-active-text'
                              : 'bg-chip-default-bg text-chip-default-text hover:text-tab-text-hover'
                          }`}
                        >
                          {filter === 'ALL'
                            ? '전체 강의'
                            : filter === 'IN_PROGRESS'
                              ? '진행 중인 강의'
                              : '완료된 강의'}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 justify-items-center gap-y-10 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-23.5 lg:gap-y-[105px]">
                      {filteredLearning.length ? (
                        <>
                          {filteredLearning.map((lecture) => (
                            <div
                              key={lecture.lectureId}
                              className="flex h-full w-full max-w-[417px] flex-col overflow-hidden rounded-20 border border-card-border bg-white sm:rounded-30 lg:h-[440px]"
                            >
                              <div className="relative aspect-[415/235] overflow-hidden">
                                {lecture.thumbnailUrl ? (
                                  <>
                                    <img
                                      src={lecture.thumbnailUrl}
                                      className="h-full w-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-banner-glass backdrop-blur-[4px]" />
                                  </>
                                ) : (
                                  <div
                                    className="h-full w-full"
                                    style={{
                                      background:
                                        'linear-gradient(180deg, #A855F7 0%, rgba(99, 102, 241, 0.00) 159%)',
                                    }}
                                  />
                                )}
                                {lecture.difficulty && (
                                  <div className="absolute left-4 top-4 z-nav rounded-10 bg-badge-bg px-3 py-1.5 font-medium sm:left-[29px] sm:top-8 sm:px-3.5 sm:py-2">
                                    {DIFFICULTY_LABELS[lecture.difficulty]}
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={() => goResume(lecture)}
                                  className="absolute inset-0 flex items-center justify-center"
                                >
                                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/60 bg-white/40 sm:h-[79px] sm:w-[79px]">
                                    <TriangleRightIcon className="h-6 w-6 translate-x-[3px] text-white sm:h-[29px] sm:w-[29px] sm:translate-x-[4px]" />
                                  </span>
                                </button>
                              </div>
                              <div className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-2 sm:gap-4.5 sm:px-6 sm:pb-[13.5px] sm:pt-[7px] lg:px-[33.5px]">
                                <div className="flex items-end justify-between gap-2">
                                  <CategoryBadge>{lecture.position}</CategoryBadge>
                                  <div className="flex items-center">
                                    <img
                                      src={StarRatingIcon}
                                      alt="별점"
                                      className="h-7 w-7 sm:h-9 sm:w-9"
                                    />
                                    <span className="mr-2 translate-y-[1px] text-lg font-semibold leading-[1.2] text-yellow-500 sm:text-xl">
                                      {formatRating(lecture.rating)}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-2.5">
                                  <h4 className="text-lg leading-snug sm:text-2xl sm:leading-[1.21]">
                                    {lecture.title}
                                  </h4>
                                  <div className="flex items-center gap-[7px]">
                                    <div className="relative flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full bg-btn-disabled-bg sm:h-8 sm:w-8">
                                      {lecture.instructorImageUrl ? (
                                        <img
                                          src={lecture.instructorImageUrl}
                                          alt={lecture.instructorName ?? '강사'}
                                          className="h-full w-full object-cover"
                                        />
                                      ) : (
                                        <></>
                                      )}
                                    </div>
                                    <span className="text-base font-semibold leading-[1.2] text-text-body sm:text-xl">
                                      {lecture.instructorName ?? '강사 정보 없음'}
                                    </span>
                                  </div>
                                </div>
                                {lecture.progressRate != null && (
                                  <div className="w-full self-end">
                                    <div className="flex items-center justify-between gap-3 leading-[1.2] text-text-body">
                                      <div className="flex items-center gap-1.5">
                                        <TimeIcon className="w-5.5 h-5.5" />
                                        <span>
                                          {formatStudyDuration(lecture.studyDurationMinutes)}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-[7.2px]">
                                        <BookIcon className="w-4.5 translate-y-[1px]" />
                                        <span>진도율 {lecture.progressRate}%</span>
                                      </div>
                                    </div>
                                    <div className="mt-[5.5px] h-3 overflow-hidden rounded-20 bg-[rgba(var(--neutral-180-rgb),0.13)] border border-text-body/20 shadow-7">
                                      <div
                                        className="h-full rounded-20 bg-primary-500 border border-card-border"
                                        style={{
                                          width: `${Math.min(100, Math.max(0, lecture.progressRate))}%`,
                                        }}
                                      />
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => navigate(ROUTES.COURSES.ROOT)}
                            className="flex min-h-[320px] w-full max-w-[417px] flex-col items-center justify-center overflow-hidden rounded-20 border border-dashed border-card-border bg-white px-6 py-10 text-center shadow-2 sm:min-h-[400px] sm:rounded-30 sm:px-10 lg:min-h-[501px] lg:px-[74.5px] lg:-translate-y-7.5"
                          >
                            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-icon-neutral-250/35 sm:h-19 sm:w-19">
                              <img
                                src={SearchIcon}
                                alt=""
                                className="w-8 [transform:scaleX(-1)_scaleY(-1)_rotate(-172.27deg)] sm:w-11"
                              />
                            </div>
                            <h3 className="mb-3 text-xl font-semibold leading-[1.2] sm:mb-4 sm:text-[2rem]">
                              새로운 강의 찾기
                            </h3>
                            <p className="text-base leading-relaxed text-text-body sm:text-2xl sm:leading-[1.21]">
                              나에게 맞는 새로운 기술과
                              <br />
                              트렌드를 탐험해보세요.
                            </p>
                          </button>
                        </>
                      ) : (
                        <div className="rounded-3xl border border-divider bg-white p-8 text-center text-sm text-text-body">
                          선택한 필터에 해당하는 학습 강의가 없습니다.
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
