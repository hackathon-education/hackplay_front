import JobIcon from '@/assets/auth/briefcase-icon.svg?react';
import CheckIcon from '@/assets/common/check-icon.svg?react';
import ErrorIcon from '@/assets/common/close-icon.svg?react';
import CalendarIcon from '@/assets/lecture/calendar-icon.svg?react';
import TeamMembersIcon from '@/assets/lecture/team-members-icon.svg?react';
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
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import CategoryBadge from '@/components/lecture/CategoryBadge';
import PasswordConfirmModal from '@/components/mypage/PasswordConfirmModal';
import { DIFFICULTY_LABELS, JOB_TYPES, JobKey } from '@/constants/jobTypes';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

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
  },
];

const MyPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { user, login, logout } = useAuthStore();

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
    resetSettings(profile);
  }, [profile, resetSettings]);

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
      logout();
      resetWithdraw();
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
    <div className="relative min-h-screen lg:h-[2353px] overflow-hidden -mx-[15px] lg:-mx-5 -mt-16.5 lg:-mt-24">
      <img
        src={MypageBg}
        alt=""
        className="absolute inset-0 z-0 w-full h-full 2xl:h-auto object-cover"
      />

      <div className="relative z-base mx-auto w-full max-w-[1703px] px-[15px] lg:px-5 pt-26 lg:pt-[175px] pb-20">
        <PasswordConfirmModal
          isOpen={pwModalOpen}
          title={pwModalTitle}
          description={pwModalDesc}
          confirmText={pwModalConfirmText}
          onClose={() => setPwModalOpen(false)}
          onConfirm={handlePasswordConfirm}
        />

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar */}
          <aside className="lg:w-[113px] shrink-0">
            <div className="flex flex-col rounded-l-20 border border-r-0 border-tab-border-default overflow-hidden divide-y divide-tab-border-default">
              {(['settings', 'payments', 'history', 'withdraw'] as TabKey[]).map((tab) => {
                const selected = tab === activeTab;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setSearchParams({ tab })}
                    className={`relative flex w-full items-center justify-center py-3.5 text-sm leading-tight transition-all ${
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
          <section className="relative flex-1">
            <div className="min-h-[538px] rounded-20 rounded-tl-none border border-l-0 border-card-border bg-tab-bg-default p-8 lg:p-[55px]">
              <div className={`${activeTab === 'settings' ? 'max-w-[299px] mx-auto' : ''}`}>
                <h2 className="text-2xl text-text-accent leading-[1.2]">{TAB_LABEL[activeTab]}</h2>

                {/* Settings */}
                {activeTab === 'settings' && (
                  <div className="mt-[35px] flex flex-col gap-[35px]">
                    <div className="flex flex-col gap-[35px] pr-[13px]">
                      <div className="flex flex-col gap-[7px]">
                        <label className="text-sm text-text-base leading-tight">닉네임</label>
                        <div className="flex items-center gap-2">
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
                            className={
                              settingsErrors.nickname
                                ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                                : ''
                            }
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
                        <div className="flex items-center gap-2">
                          <Input
                            type="email"
                            iconType="email"
                            iconSize="w-4.5 h-auto"
                            {...registerSettings('email', { required: '이메일을 입력해주세요' })}
                            className={
                              settingsErrors.email
                                ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                                : ''
                            }
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
                            <div className="flex gap-2 items-center">
                              <Input
                                iconType="verifyCode"
                                iconSize="w-4.5 h-auto"
                                placeholder="인증코드 6자리"
                                maxLength={6}
                                value={verifyCode}
                                disabled={isCodeVerified}
                                onChange={(e) => setVerifyCode(e.target.value)}
                                className={
                                  verifyCodeError
                                    ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                                    : ''
                                }
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
                        <div className="flex items-center gap-2">
                          <div className="relative w-full">
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
                          {settingsErrors.role && (
                            <div className="flex text-text-error ml-[17px] items-center gap-1">
                              <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
                              <span className="text-sm leading-tight">
                                {settingsErrors.role.message}
                              </span>
                            </div>
                          )}
                          <Button
                            type="button"
                            size="w53h35"
                            rounded="xs"
                            className="shrink-0"
                            onClick={() => saveSettingsField('role')}
                            disabled={currentSettings.role === profile.role}
                          >
                            수정
                          </Button>
                        </div>
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
                  <div className="mt-8 rounded-3xl border border-card-border bg-card-bg p-10 text-center">
                    <p className="text-text-body">결제 내역 기능은 준비 중입니다.</p>
                  </div>
                )}

                {/* History */}
                {activeTab === 'history' && (
                  <div className="mt-5 flex flex-col gap-8">
                    <div className="rounded-30 overflow-hidden border border-card-border bg-gradient-hero lg:flex items-start p-10 shadow-2">
                      <div className="relative aspect-[613/416] overflow-hidden lg:w-[613px] shrink-0 border border-banner-border rounded-30 shadow-1">
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
                            <span className="flex w-30 h-30 items-center justify-center rounded-full border border-white/60 bg-white/40">
                              <TriangleRightIcon className="w-11 h-11 translate-x-[6px] text-white" />
                            </span>
                          </button>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col items-start justify-between p-6 pt-0 lg:p-[35px] lg:pt-0">
                        <CategoryBadge>{recentLearning?.position ?? 'FRONTEND'}</CategoryBadge>

                        <div>
                          <h3 className="mt-[13px] text-5xl font-semibold text-text-accent leading-[1.2] whitespace-nowrap">
                            {recentLearning?.title}
                          </h3>
                          <div className="mt-[13px] flex flex-wrap items-center gap-5 text-text-base text-sm leading-tight">
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
                          <p className="mt-[51px] text-xl leading-tight text-text-base">
                            {recentLearning?.description}
                          </p>
                          {recentLearning?.progressRate != null && (
                            <div className="mt-10 w-full self-end lg:mt-25">
                              <div className="flex items-center justify-between gap-3 text-xl leading-[1.2] text-text-body">
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

                    <div className="flex flex-wrap gap-[9px] w-fit shadow-3 border border-chip-default-border bg-white rounded-30 p-2.5">
                      {(['ALL', 'IN_PROGRESS', 'COMPLETED'] as const).map((filter) => (
                        <button
                          key={filter}
                          type="button"
                          onClick={() => setHistoryFilter(filter)}
                          className={`rounded-50 px-4 py-[9px] text-xl leading-none transition ${
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

                    <div className="grid grid-cols-1 gap-x-19.5 gap-y-38.5 lg:grid-cols-3">
                      {filteredLearning.length ? (
                        filteredLearning.map((lecture) => (
                          <div
                            key={lecture.lectureId}
                            className="rounded-30 overflow-hidden border border-card-border bg-white max-w-[417px]"
                          >
                            <div className="relative aspect-[415/234] overflow-hidden">
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
                                <div className="absolute top-8 left-[29px] z-nav bg-badge-bg rounded-10 px-3.5 py-2 font-medium">
                                  {DIFFICULTY_LABELS[lecture.difficulty]}
                                </div>
                              )}
                              <button
                                type="button"
                                onClick={() => goResume(lecture)}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <span className="flex w-[79px] h-[79px] items-center justify-center rounded-full border border-white/60 bg-white/40">
                                  <TriangleRightIcon className="w-[29px] h-[29px] translate-x-[4px] text-white" />
                                </span>
                              </button>
                            </div>
                            <div className="pt-4 pb-5 px-[33.5px] flex flex-col gap-4.5">
                              <div className="flex items-end justify-between gap-2">
                                <CategoryBadge>{lecture.position}</CategoryBadge>
                                <div className="flex items-center">
                                  <img src={StarRatingIcon} alt="별점" className="w-9 h-9" />
                                  <span className="font-semibold text-xl leading-[1.2] text-yellow-500 mr-2 translate-y-[1px]">
                                    {formatRating(lecture.rating)}
                                  </span>
                                </div>
                              </div>
                              <h4 className="text-2xl leading-[1.21]">{lecture.title}</h4>
                              <div className="flex items-center gap-[7px]">
                                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-btn-disabled-bg">
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
                                <span className="text-xl font-semibold leading-[1.2] text-text-body">
                                  {lecture.instructorName ?? '강사 정보 없음'}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="rounded-3xl border border-divider bg-white p-8 text-center text-sm text-text-body">
                          선택한 필터에 해당하는 학습 강의가 없습니다.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Withdraw */}
                {activeTab === 'withdraw' && (
                  <div className="mt-8 rounded-3xl border border-card-border bg-card-bg p-6 lg:p-8">
                    <h3 className="text-lg font-bold text-text-title text-red-600">회원 탈퇴</h3>
                    <p className="mt-2 text-sm text-text-body">
                      탈퇴 시 모든 학습 데이터가 삭제되며 복구할 수 없습니다.
                    </p>
                    <form
                      className="mt-8 flex flex-col gap-4"
                      onSubmit={handleSubmitWithdraw(onSubmitWithdraw)}
                    >
                      <Input
                        type="password"
                        placeholder="비밀번호 확인"
                        {...registerWithdraw('password', { required: true })}
                      />
                      <Button
                        type="submit"
                        disabled={!withdrawIsValid}
                        className="!bg-red-500 hover:!bg-red-600"
                      >
                        탈퇴하기
                      </Button>
                    </form>
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
