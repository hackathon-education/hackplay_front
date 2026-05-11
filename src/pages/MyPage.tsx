import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { toast } from 'sonner';

import { axiosInstance } from '@/api/axios';
import { LearningLecture } from '@/api/learning';
import { changeMyPassword, withdrawMember } from '@/api/member';
import MypageBg from '@/assets/mypage/mypage-bg.webp';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import PasswordConfirmModal from '@/components/mypage/PasswordConfirmModal';
import { JOB_TYPES, JobKey } from '@/constants/jobTypes';
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

function safeRating(rating?: number) {
  if (typeof rating !== 'number') return null;
  return Math.max(0, Math.min(5, rating));
}

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-badge-bg px-3 py-1 text-xs font-semibold text-text-accent shadow-1">
    {children}
  </span>
);

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
  const [verifyCode, setVerifyCode] = useState('');
  const [verifyCodeError, setVerifyCodeError] = useState('');

  // Password confirm modal
  const [pwModalOpen, setPwModalOpen] = useState(false);
  const [pwModalTitle, setPwModalTitle] = useState('');
  const [pwModalDesc, setPwModalDesc] = useState<string | undefined>(undefined);
  const [pwModalConfirmText, setPwModalConfirmText] = useState('');
  const [pendingAction, setPendingAction] = useState<null | {
    type: 'CHANGE_PASSWORD';
    newPassword: string;
  }>(null);

  // Forms
  const {
    register: registerSettings,
    handleSubmit: handleSubmitSettings,
    watch: watchSettings,
    formState: { errors: settingsErrors, isValid: settingsIsValid },
    reset: resetSettings,
  } = useForm<{ nickname: string; email: string; role: JobKey }>({
    mode: 'onChange',
    defaultValues: profile,
  });

  const {
    register: registerPw,
    handleSubmit: handleSubmitPw,
    watch: watchPw,
    formState: { errors: pwErrors, isValid: pwIsValid },
    reset: resetPw,
  } = useForm<{ newPassword: string; confirmNewPassword: string }>({
    mode: 'onChange',
  });

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

  const openPasswordModalFor = (action: NonNullable<typeof pendingAction>, title: string) => {
    setPendingAction(action);
    setPwModalTitle(title);
    setPwModalDesc('아래 항목에 정보를 입력해주세요.');
    setPwModalConfirmText('비밀번호 변경하기');
    setPwModalOpen(true);
  };

  const handlePasswordConfirm = async (currentPassword: string, newPassword: string) => {
    if (!pendingAction) return;
    try {
      if (pendingAction.type === 'CHANGE_PASSWORD') {
        const res = await changeMyPassword({
          currentPassword,
          newPassword,
        });
        if (res.code !== 200) throw new Error(res.message);
        toast.success('비밀번호를 변경했습니다.');
        resetPw();
      }
    } catch (e: any) {
      toast.error(e?.response?.data?.message ?? e?.message ?? '요청 처리에 실패했습니다.');
      throw e;
    } finally {
      setPendingAction(null);
    }
  };

  const onSubmitSettings: SubmitHandler<{ nickname: string; email: string; role: JobKey }> = (
    data,
  ) => {
    const changed: { nickname?: string; email?: string; role?: JobKey } = {};
    if (data.nickname !== profile.nickname) changed.nickname = data.nickname;
    if (data.role !== profile.role) changed.role = data.role;
    if (data.email !== profile.email) changed.email = data.email;

    if (!Object.keys(changed).length) {
      toast('변경 사항이 없어요.');
      return;
    }

    toast.error('프로필 업데이트 기능은 준비 중입니다.');
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
    try {
      const res = await axiosInstance.post('/v1/email/verify', {
        email: nextEmail,
        verifyCode,
      });
      if (res.data?.code === 200) {
        setIsCodeVerified(true);
        toast.success('이메일 인증이 완료되었습니다.');
      } else {
        toast.error(res.data?.message ?? '인증에 실패했습니다.');
      }
    } catch (e: any) {
      setVerifyCodeError(e?.response?.data?.message ?? '인증 실패');
    }
  };

  const onSubmitPassword: SubmitHandler<{ newPassword: string; confirmNewPassword: string }> = (
    data,
  ) => {
    openPasswordModalFor(
      { type: 'CHANGE_PASSWORD', newPassword: data.newPassword },
      '비밀번호 변경',
    );
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

  const filteredLearning = useMemo(() => {
    if (historyFilter === 'ALL') return learningList;
    return learningList.filter((l) => l.status === historyFilter);
  }, [learningList, historyFilter]);

  const recentLearning = useMemo(() => {
    const copy = [...learningList];
    copy.sort((a, b) => {
      const at = a.lastStudiedAt ? new Date(a.lastStudiedAt).getTime() : 0;
      const bt = b.lastStudiedAt ? new Date(b.lastStudiedAt).getTime() : 0;
      return bt - at;
    });
    return copy[0];
  }, [learningList]);

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
            <div className="min-h-[700px] rounded-[40px] rounded-tl-none border border-l-0 border-card-border bg-tab-bg-default p-8 shadow-1 lg:p-12">
              <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-wide text-text-title">
                  {TAB_LABEL[activeTab]}
                </h2>
                <p className="text-sm text-text-body">{TAB_DESC[activeTab]}</p>
              </div>

              {/* Settings */}
              {activeTab === 'settings' && (
                <div className="mt-8 flex flex-col gap-6">
                  <div className="rounded-3xl border border-card-border bg-card-bg p-6 lg:p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-text-title">개인정보</h3>
                      {profileLoading && (
                        <span className="text-xs text-text-body">불러오는 중...</span>
                      )}
                    </div>

                    <form
                      className="mt-6 flex flex-col gap-5"
                      onSubmit={handleSubmitSettings(onSubmitSettings)}
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-text-title">닉네임</label>
                        <Input
                          iconType="nickname"
                          iconSize="w-5.5 h-auto -translate-x-[2px]"
                          placeholder="닉네임"
                          maxLength={30}
                          {...registerSettings('nickname', {
                            required: '닉네임을 입력해주세요',
                            minLength: {
                              value: 2,
                              message: '닉네임은 최소 2자 이상이어야 합니다.',
                            },
                          })}
                          className={settingsErrors.nickname ? 'border-input-error-border' : ''}
                        />
                        {settingsErrors.nickname && (
                          <p className="ml-4 text-sm text-text-error">
                            {settingsErrors.nickname.message}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-text-title">이메일</label>
                        <div className="flex gap-2">
                          <Input
                            type="email"
                            iconType="email"
                            placeholder="이메일"
                            {...registerSettings('email', { required: '이메일을 입력해주세요' })}
                            className={settingsErrors.email ? 'border-input-error-border' : ''}
                          />
                          <Button
                            type="button"
                            size="w74h43"
                            rounded="sm"
                            disabled={isSendingCode || watchSettings('email') === profile.email}
                            onClick={() => handleSendEmailCode(watchSettings('email'))}
                          >
                            인증
                          </Button>
                        </div>
                        {isCodeSent && !isCodeVerified && (
                          <div className="mt-2 flex gap-2">
                            <Input
                              placeholder="인증코드"
                              value={verifyCode}
                              onChange={(e) => setVerifyCode(e.target.value)}
                            />
                            <Button
                              type="button"
                              size="w74h43"
                              onClick={() => handleVerifyEmailCode(watchSettings('email'))}
                            >
                              확인
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-semibold text-text-title">희망 직무</label>
                        <select
                          {...registerSettings('role')}
                          className="h-12.5 w-full appearance-none rounded-2xl border border-input-default-border bg-input-default-bg px-4 text-sm font-semibold outline-none focus:ring-1 focus:ring-input-focus-ring"
                        >
                          <option value="PLAN">{JOB_TYPES.PLAN}</option>
                          <option value="DESIGN">{JOB_TYPES.DESIGN}</option>
                          <option value="FRONT">{JOB_TYPES.FRONT}</option>
                          <option value="BACK">{JOB_TYPES.BACK}</option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        disabled={!settingsIsValid}
                        size="wfullh50"
                        className="mt-4"
                      >
                        저장하기
                      </Button>
                    </form>
                  </div>

                  <div className="rounded-3xl border border-card-border bg-card-bg p-6 lg:p-8">
                    <h3 className="text-lg font-bold text-text-title">비밀번호 변경</h3>
                    <form
                      className="mt-6 flex flex-col gap-5"
                      onSubmit={handleSubmitPw(onSubmitPassword)}
                    >
                      <Input
                        type="password"
                        iconType="password"
                        placeholder="새 비밀번호"
                        {...registerPw('newPassword', { required: true })}
                      />
                      <Input
                        type="password"
                        iconType="confirmPassword"
                        placeholder="비밀번호 확인"
                        {...registerPw('confirmNewPassword', { required: true })}
                      />
                      <Button type="submit" disabled={!pwIsValid} size="wfullh50">
                        비밀번호 변경
                      </Button>
                    </form>
                  </div>
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
                <div className="mt-8 flex flex-col gap-6">
                  <div className="rounded-3xl border border-card-border bg-card-bg p-6 lg:p-8">
                    <h3 className="mb-6 text-lg font-bold text-text-title">최근 학습</h3>
                    {recentLearning ? (
                      <div className="flex flex-col gap-6 lg:flex-row">
                        <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-2xl border border-divider bg-gray-100 lg:w-[300px]">
                          {recentLearning.thumbnailUrl && (
                            <img
                              src={recentLearning.thumbnailUrl}
                              className="h-full w-full object-cover"
                            />
                          )}
                          <button
                            onClick={() => goResume(recentLearning)}
                            className="absolute inset-0 flex items-center justify-center bg-black/10"
                          >
                            <span className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                              <span className="ml-1 border-y-[8px] border-y-transparent border-l-[12px] border-l-primary-500" />
                            </span>
                          </button>
                        </div>
                        <div className="flex flex-1 flex-col justify-center">
                          <div className="flex gap-2">
                            <Pill>
                              {recentLearning.status === 'COMPLETED' ? '완료' : '진행 중'}
                            </Pill>
                          </div>
                          <h4 className="mt-3 text-xl font-bold text-text-title">
                            {recentLearning.title}
                          </h4>
                          <button
                            onClick={() => goResume(recentLearning)}
                            className="mt-4 w-fit text-sm font-bold text-text-accent hover:underline"
                          >
                            이어서 학습하기 ›
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-text-body">학습 이력이 없습니다.</p>
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
          </section>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
