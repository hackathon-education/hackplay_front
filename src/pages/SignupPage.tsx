import JobIcon from '@/assets/auth/briefcase-icon.svg?react';
import CheckIcon from '@/assets/common/check-icon.svg?react';
import ErrorIcon from '@/assets/common/close-icon.svg?react';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { TbEye, TbEyeOff } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

import { toast } from 'sonner';

import { axiosInstance } from '@/api/axios';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
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
  const [isVerifying, setIsVerifying] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeError, setVerificationCodeError] = useState('');

  const {
    register,
    watch,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const email = watch('email');
  const canSubmit = isValid && isCodeVerified;

  useEffect(() => {
    if (!isCodeSent || isCodeVerified || !verificationCode) return;

    if (/[^a-zA-Z0-9]/.test(verificationCode)) {
      setVerificationCodeError('인증코드는 영문자와 숫자만 입력할 수 있습니다.');
      return;
    }
    if (!/^[a-zA-Z0-9]{6}$/.test(verificationCode)) {
      setVerificationCodeError('인증코드는 6자리 영숫자입니다.');
      return;
    }
    setVerificationCodeError('');
  }, [verificationCode, isCodeSent, isCodeVerified]);

  const handleEmailVerification = async () => {
    if (!email || errors.email) return;
    setIsVerifying(true);
    try {
      const checkResponse = await axiosInstance.post('/v1/email/check', { email });
      if (checkResponse.data.data === 'Y') {
        alert('이미 사용 중인 이메일입니다.');
        return;
      }
      await axiosInstance.post('/v1/email/send', { email });
      toast.success('인증코드가 전송되었습니다.');
      setIsCodeSent(true);
      setIsCodeVerified(false);
      setVerificationCode('');
    } catch (error: any) {
      alert(error.response?.data.message || '인증코드 전송 중 오류 발생');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCodeError || !email) return;
    setIsVerifyingCode(true);
    try {
      const response = await axiosInstance.post('/v1/email/verify', {
        email,
        verifyCode: verificationCode,
      });
      if (response.data.code === 200) {
        setIsCodeVerified(true);
        alert('인증이 완료되었습니다.');
      }
    } catch (error: any) {
      setVerificationCodeError(error.response?.data.message || '인증 실패');
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axiosInstance.post('/v1/auth/signup', data);
      alert('회원가입 완료!');
      navigate(ROUTES.SIGNIN);
    } catch (error: any) {
      alert(error.response?.data.message || '회원가입 실패');
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form className="flex flex-col gap-3.5 w-full" onSubmit={handleSubmit(onSubmit)}>
        {/* 이메일 */}
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Input
              type="email"
              iconType="email"
              iconSize="w-4.5 h-auto"
              placeholder="이메일을 입력해 주세요."
              disabled={isCodeVerified}
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '형식이 올바르지 않습니다.',
                },
              })}
              className={
                errors.email
                  ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                  : ''
              }
            />
            <Button
              type="button"
              disabled={!email || !!errors.email || isVerifying || isCodeVerified}
              onClick={handleEmailVerification}
              size="w74h43"
              rounded="sm"
              className="shrink-0 text-xs !font-medium"
            >
              {isVerifying ? '...' : '인증하기'}
            </Button>
          </div>
          {errors.email && (
            <div className="flex text-text-error ml-[17px] items-center gap-1">
              <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
              <span className="text-sm leading-tight">{errors.email.message}</span>
            </div>
          )}
        </div>

        {/* 인증코드 */}
        {isCodeSent && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <Input
                iconType="verifyCode"
                iconSize="w-4.5 h-auto"
                placeholder="인증코드 6자리"
                maxLength={6}
                value={verificationCode}
                disabled={isCodeVerified}
                onChange={(e) => setVerificationCode(e.target.value)}
                className={
                  verificationCodeError
                    ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                    : ''
                }
              />
              <Button
                type="button"
                disabled={
                  !verificationCode || !!verificationCodeError || isVerifyingCode || isCodeVerified
                }
                onClick={handleVerifyCode}
                size="w74h43"
                rounded="sm"
                className={`shrink-0 text-xs ${isCodeVerified ? '!font-semibold' : ''}`}
              >
                {isCodeVerified ? '인증완료' : '확인'}
              </Button>
            </div>
            {verificationCodeError && (
              <div className="flex text-text-error ml-[17px] items-center gap-1">
                <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
                <span className="text-sm leading-tight">{verificationCodeError}</span>
              </div>
            )}
            {isCodeVerified && (
              <div className="flex text-text-accent ml-[17px] items-center gap-1">
                <CheckIcon className="stroke-current stroke-[1.5px]" />
                <span className="text-sm leading-tight">이메일 인증이 완료되었습니다.</span>
              </div>
            )}
          </div>
        )}

        {/* 닉네임 */}
        <div className="flex flex-col gap-2">
          <Input
            iconType="nickname"
            iconSize="w-5.5 h-auto -translate-x-[2px]"
            placeholder="닉네임을 입력해 주세요."
            maxLength={30}
            {...register('nickname', {
              required: '닉네임을 입력해주세요',
              minLength: { value: 2, message: '닉네임은 최소 2자 이상이어야 합니다.' },
              maxLength: { value: 30, message: '닉네임은 최대 30자까지 가능합니다.' },
              pattern: {
                value: /^[\u1100-\u11FF\u3130-\u318F\uAC00-\uD7A3a-zA-Z\s-]+$/,
                message: '닉네임은 한글(완성형+자모), 영문, 공백, 하이픈만 사용할 수 있습니다.',
              },
            })}
            className={
              errors.nickname
                ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                : ''
            }
          />
          {errors.nickname && (
            <div className="flex text-text-error ml-[17px] items-center gap-1">
              <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
              <span className="text-sm leading-tight">{errors.nickname.message}</span>
            </div>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="relative flex flex-col gap-2">
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              iconType="password"
              iconSize="w-4 h-auto"
              placeholder="비밀번호를 입력해 주세요."
              maxLength={64}
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                validate: (v) => {
                  if (v.length < 8 || v.length > 64) return '비밀번호는 8~64자 사이여야 합니다.';
                  if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(v))
                    return '비밀번호는 영문, 숫자, 특수문자만 사용할 수 있습니다.';
                  const hasLetter = /[a-zA-Z]/.test(v);
                  const hasNumber = /[0-9]/.test(v);
                  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(v);
                  const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
                  if (count < 2)
                    return '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 포함해야 합니다.';

                  return true;
                },
                onChange: () => {
                  trigger('confirmPassword');
                },
              })}
              className={
                errors.password
                  ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                  : ''
              }
            />
            {/* TODO: 비밀번호 보기 기능 유지할지 확인. 비밀번호 확인도. 없앨 거면 relative div도 삭제 */}
            {/* <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <TbEyeOff className="text-gray-400" />
              ) : (
                <TbEye className="text-gray-400" />
              )}
            </button> */}
          </div>
          {errors.password && (
            <div className="flex text-text-error ml-[17px] items-center gap-1">
              <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
              <span className="text-sm leading-tight">{errors.password.message}</span>
            </div>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="relative flex flex-col gap-2">
          <div className="relative">
            <Input
              iconType="confirmPassword"
              iconSize="w-4 h-auto !text-text-base stroke-[2.5px] overflow-visible"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="한 번 더 비밀번호를 입력해 주세요."
              {...register('confirmPassword', {
                required: true,
                validate: (v) => {
                  if (!v) return true;
                  return v === watch('password') || '비밀번호가 일치하지 않습니다.';
                },
              })}
              className={
                errors.confirmPassword?.type === 'validate'
                  ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                  : ''
              }
            />
            {/* <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <TbEyeOff className="text-gray-400" />
              ) : (
                <TbEye className="text-gray-400" />
              )}
            </button> */}
          </div>
          {errors.confirmPassword?.type === 'validate' && (
            <div className="flex text-text-error ml-[17px] items-center gap-1">
              <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
              <span className="text-sm leading-tight">{errors.confirmPassword.message}</span>
            </div>
          )}
        </div>

        {/* 직무 선택 */}
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            {/* 아이콘 배치 */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              <JobIcon className="text-text-base w-4.5 -translate-x-[1px]" />
            </div>

            <select
              {...register('role', { required: '직무를 선택해 주세요.' })}
              className={`
        w-full h-12.5 rounded-2xl border border-input-default-border bg-input-default-bg 
        pl-[43px] pr-10 text-sm font-semibold outline-none appearance-none 
        focus:border-input-focus-border focus:ring-1 focus:ring-input-focus-ring transition-all
        ${errors.role ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border' : ''} ${watch('role') === '' ? 'text-placeholder-text' : 'text-input-default-text'}
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
          {errors.role && (
            <div className="flex text-text-error ml-[17px] items-center gap-1">
              <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
              <span className="text-sm leading-tight">{errors.role.message}</span>
            </div>
          )}
        </div>

        {/* 약관 동의 */}
        <div className="flex flex-col gap-3.5 ml-[15px]">
          <label className="flex items-center gap-3.5 text-sm text-text-base cursor-pointer leading-tight">
            <input
              type="checkbox"
              {...register('agreeMail')}
              className="w-3 h-3 appearance-none border-2 rounded-4 border-input-default-icon cursor-pointer checked:bg-input-disabled-border"
            />
            안내 메일 수신에 동의합니다
          </label>
          <div className="flex flex-col gap-2">
            <label className="flex items-center gap-3.5 text-sm text-text-base cursor-pointer leading-tight">
              <input
                type="checkbox"
                {...register('agreeTerms', { required: '약관 동의가 필요합니다' })}
                className={`w-3 h-3 appearance-none border-2 rounded-4 border-input-default-icon cursor-pointer checked:bg-input-disabled-border ${errors.agreeTerms ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border' : ''}`}
              />
              <span>
                <span className="text-text-accent">이용약관</span> 및{' '}
                <span className="text-text-accent">개인정보처리방침</span>에 동의합니다
              </span>
            </label>
            {errors.agreeTerms && (
              <div className="flex text-text-error ml-[17px] items-center gap-1">
                <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
                <span className="text-sm leading-tight">{errors.agreeTerms.message}</span>
              </div>
            )}
          </div>
        </div>

        <Button type="submit" disabled={!canSubmit} size="wfullh50">
          회원가입
        </Button>
      </form>
    </div>
  );
};

export default SignupPage;
