import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '@/api/axios';
import { JOB_TYPES } from '@/constants/jobTypes';
import { ROUTES } from '@/constants/routes';

type FormValues = {
  email: string;
  nickname: string;
  password: string;
  confirmPassword: string;
  role: string;
  agreeMail: boolean;
  agreeTerms: boolean;
};

const SignupPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false); // 이메일 인증 중 상태
  const [isCodeSent, setIsCodeSent] = useState(true); // 인증코드 전송 완료 여부
  const [isCodeVerified, setIsCodeVerified] = useState(false); // 인증코드 확인 완료 여부
  const [isVerifyingCode, setIsVerifyingCode] = useState(false); // 인증코드 확인 중 상태
  const [verificationCode, setVerificationCode] = useState(''); // 인증코드
  const [verificationCodeError, setVerificationCodeError] = useState(''); // 인증코드 에러

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const password = watch('password');
  const email = watch('email');

  const canSubmit = isValid;

  // 인증코드 검증 (영숫자 이외 문자, 6자리)
  useEffect(() => {
    if (!isCodeSent || isCodeVerified || !verificationCode) {
      return;
    }

    // 영숫자 이외 문자 체크
    if (/[^a-zA-Z0-9]/.test(verificationCode)) {
      setVerificationCodeError('인증코드는 영문자와 숫자만 입력할 수 있습니다.');
      return;
    }

    // 6자리 검증
    if (!/^[a-zA-Z0-9]{6}$/.test(verificationCode)) {
      setVerificationCodeError('인증코드는 6자리 영숫자입니다.');
      return;
    }

    // 검증 통과 시 에러 초기화
    setVerificationCodeError('');
  }, [verificationCode, isCodeSent, isCodeVerified]);

  // 이메일 인증 처리 함수
  const handleEmailVerification = async () => {
    if (!email || errors.email) {
      return;
    }

    setIsVerifying(true);
    try {
      // 1. 이메일 중복 여부 체크
      const checkResponse = await axiosInstance.post('/v1/email/check', { email });

      if (checkResponse.data.data === 'Y') {
        alert('이미 사용 중인 이메일입니다.');
        setIsVerifying(false);
        return;
      }

      // 2. 중복이 없으면 (data === 'N') 인증코드 전송
      if (checkResponse.data.data === 'N') {
        await axiosInstance.post('/v1/email/send', { email });
        alert('인증코드가 전송되었습니다. 이메일을 확인해주세요.');
        setIsCodeSent(true);
        setIsCodeVerified(false); // 새로운 인증코드 전송 시 인증 상태 초기화
        setVerificationCode(''); // 인증코드 초기화
        setVerificationCodeError(''); // 에러 초기화
      }
    } catch (error: any) {
      if (error.response) {
        alert(`오류: ${error.response.data.message || '알 수 없는 오류가 발생했습니다.'}`);
      } else {
        alert('인증코드 전송 중 오류가 발생했습니다.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // 인증코드 확인 함수
  const handleVerifyCode = async () => {
    // 에러가 있으면 진행하지 않음
    if (verificationCodeError) {
      return;
    }

    if (!email) {
      alert('이메일을 먼저 입력해주세요.');
      return;
    }

    setIsVerifyingCode(true);
    try {
      // TODO: 인증코드 확인 API 호출
      // const response = await axiosInstance.post('/v1/email/verify', { email, code: verificationCode });
      // 임시로 성공 처리 (실제 API 연동 시 주석 해제)
      await new Promise((resolve) => setTimeout(resolve, 500)); // 임시 딜레이
      setIsCodeVerified(true);
      setVerificationCodeError('');
      alert('인증이 완료되었습니다.');
    } catch (error: any) {
      if (error.response) {
        const errorMessage = error.response.data.message || '인증코드가 올바르지 않습니다.';
        setVerificationCodeError(errorMessage);
        alert(`인증 실패: ${errorMessage}`);
      } else {
        setVerificationCodeError('인증코드 확인 중 오류가 발생했습니다.');
        alert('인증코드 확인 중 오류가 발생했습니다.');
      }
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axiosInstance.post('/v1/auth/signup', data);
      alert('회원가입이 완료되었습니다!');
      navigate(ROUTES.SIGNIN);
    } catch (error: any) {
      if (error.response) {
        alert(`회원가입 실패: ${error.response.data.message || '알 수 없는 오류'}`);
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[10vh] px-4 py-20">
      <div className="w-full max-w-md bg-white border border-[#0070f3] rounded-xl shadow-lg px-8 py-10">
        <h2 className="text-2xl font-bold text-center text-[#111] mb-6">회원가입</h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 */}
          <div className="flex flex-col">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="이메일"
                {...register('email', {
                  required: '이메일을 입력해주세요',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '올바른 이메일 형식이 아닙니다.',
                  },
                })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
              />
              <button
                type="button"
                disabled={!email || !!errors.email || isVerifying}
                onClick={handleEmailVerification}
                className={`font-semibold text-lg whitespace-nowrap w-29 rounded-lg transition-colors ${
                  !email || errors.email || isVerifying
                    ? 'cursor-not-allowed bg-gray-150 text-gray-600'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isVerifying ? '전송 중...' : '인증하기'}
              </button>
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          {/* 인증코드 입력 */}
          {isCodeSent && (
            <div className="flex flex-col">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="인증코드 (6자리)"
                  maxLength={6}
                  value={verificationCode}
                  disabled={isCodeVerified}
                  onChange={(e) => {
                    setVerificationCode(e.target.value);
                  }}
                  className={`w-full px-3 py-3 border rounded-lg bg-[#fefefe] text-base focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3] ${
                    isCodeVerified ? 'border-green-500 bg-green-50' : 'border-gray-300'
                  } ${isCodeVerified ? 'cursor-not-allowed' : ''}`}
                />
                <button
                  type="button"
                  disabled={
                    !verificationCode ||
                    !!verificationCodeError ||
                    isVerifyingCode ||
                    isCodeVerified
                  }
                  onClick={handleVerifyCode}
                  className={`font-semibold text-lg whitespace-nowrap w-29 rounded-lg transition-colors ${
                    !verificationCode || verificationCodeError || isVerifyingCode || isCodeVerified
                      ? 'cursor-not-allowed bg-gray-150 text-gray-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isCodeVerified ? '인증완료' : isVerifyingCode ? '확인 중...' : '확인'}
                </button>
              </div>
              {verificationCodeError && (
                <p className="text-red-500 text-sm mt-1">{verificationCodeError}</p>
              )}
              {isCodeVerified && (
                <p className="text-green-600 text-sm mt-1">✓ 이메일 인증이 완료되었습니다.</p>
              )}
            </div>
          )}

          {/* 닉네임 */}
          <div className="relative flex flex-col">
            <input
              type="text"
              placeholder="닉네임"
              maxLength={30}
              {...register('nickname', {
                required: '닉네임을 입력해주세요',
                minLength: {
                  value: 2,
                  message: '닉네임은 최소 2자 이상이어야 합니다.',
                },
                maxLength: {
                  value: 30,
                  message: '닉네임은 최대 30자까지 가능합니다.',
                },
                pattern: {
                  value: /^[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3a-zA-Z\s-]+$/,
                  message: '닉네임은 한글(완성형+자모), 영문, 공백, 하이픈만 사용할 수 있습니다.',
                },
              })}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
            />
            {errors.nickname && (
              <p className="text-red-500 text-sm mt-1">{errors.nickname.message}</p>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="relative flex flex-col">
            <div className="flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="비밀번호"
                maxLength={64}
                {...register('password', {
                  required: '비밀번호를 입력해주세요',
                  validate: (value) => {
                    if (value.length < 8 || value.length > 64) {
                      return '비밀번호는 8~64자 사이여야 합니다.';
                    }
                    if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(value)) {
                      return '비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다.';
                    }

                    const hasLetter = /[a-zA-Z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

                    const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
                    if (count < 2) {
                      return '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.';
                    }

                    return true;
                  },
                  onChange: () => {
                    trigger('confirmPassword');
                  },
                })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base pr-10 focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
              />
              <button
                type="button"
                className="absolute right-3 p-1 hover:opacity-70"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <TbEyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <TbEye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="relative flex flex-col">
            <div className="flex items-center">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="비밀번호 확인"
                {...register('confirmPassword', {
                  required: true,
                  validate: (value) =>
                    value === getValues('password') || '비밀번호가 일치하지 않습니다.',
                })}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base pr-10 focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
              />
              <button
                type="button"
                className="absolute right-3 p-1 hover:opacity-70"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <TbEyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <TbEye className="w-5 h-5 text-gray-600" />
                )}
              </button>
            </div>
            {errors.confirmPassword?.type === 'validate' && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* 직무 선택 */}
          <select
            {...register('role', { required: '직무를 선택해주세요' })}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg bg-[#fefefe] text-base appearance-none focus:outline-none focus:ring-2 focus:ring-[#0070f3]/30 focus:border-[#0070f3]"
          >
            <option value="">직무 선택</option>
            <option value="PLAN">기획</option>
            <option value="DESIGN">디자인</option>
            <option value="FRONT">{JOB_TYPES.FE}</option>
            <option value="BACK">{JOB_TYPES.BE}</option>
          </select>
          {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}

          {/* 체크박스 */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" {...register('agreeMail')} />
            안내 메일 수신에 동의합니다
          </label>
          {errors.agreeMail && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeMail.message}</p>
          )}

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              {...register('agreeTerms', { required: '약관 동의가 필요합니다' })}
            />
            이용약관 및 개인정보처리방침에 동의합니다
          </label>
          {errors.agreeTerms && (
            <p className="text-red-500 text-sm mt-1">{errors.agreeTerms.message}</p>
          )}

          {/* 회원가입 버튼 */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={`bg-blue-600 text-white font-semibold text-lg py-3 rounded-lg transition-colors ${
              canSubmit ? 'hover:bg-blue-700' : 'cursor-not-allowed'
            }`}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
