import ErrorIcon from '@/assets/common/close-icon.svg?react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { axiosInstance } from '@/api/axios';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { ROUTES } from '@/constants/routes';
import { useAuthStore } from '@/store/authStore';

interface FormValues {
  email: string;
  password: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await axiosInstance.post('/v1/auth/signin', data);
      const result = response.data;

      login({
        accessToken: result.data.accessToken,
        nickname: result.data.nickname,
        email: result.data.email,
        profileImageUrl: result.data.profileImageUrl,
        role: result.data.role,
      });

      navigate(ROUTES.MAIN);
    } catch (error: any) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('서버와 연결할 수 없습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="flex justify-center items-start">
      <div className="flex flex-col w-full max-w-[500px] mx-auto">
        <form className="flex flex-col gap-3.5" onSubmit={handleSubmit(onSubmit)}>
          {/* 이메일 입력 영역 */}
          <div className="flex flex-col gap-2">
            <Input
              type="email"
              iconType="email"
              iconSize="w-4.5 h-auto"
              placeholder="이메일을 입력해 주세요."
              {...register('email', {
                required: '이메일을 입력해주세요',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '올바른 이메일 형식이 아닙니다.',
                },
              })}
              className={
                errors.email
                  ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                  : ''
              }
            />
            {errors.email && (
              <div className="flex text-text-error ml-[17px] items-center gap-1">
                <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
                <span className="text-sm leading-tight">{errors.email.message}</span>
              </div>
            )}
          </div>

          {/* 비밀번호 입력 영역 */}
          <div className="flex flex-col gap-1">
            <Input
              type="password"
              iconType="password"
              iconSize="w-4 h-auto"
              placeholder="비밀번호를 입력해 주세요."
              maxLength={20}
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                validate: (value) => {
                  if (value.length < 8 || value.length > 20) {
                    return '비밀번호는 8~20자 사이여야 합니다.';
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
              })}
              className={
                errors.password
                  ? 'border-input-error-border focus:!border-input-error-border focus:!ring-input-error-border'
                  : ''
              }
            />
            {errors.password && (
              <div className="flex text-text-error ml-[17px] items-center gap-1">
                <ErrorIcon className="size-4 stroke-current stroke-[1.5px]" />
                <span className="text-sm leading-tight">{errors.password.message}</span>
              </div>
            )}
          </div>

          <Button type="submit" disabled={!isValid}>
            로그인
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
