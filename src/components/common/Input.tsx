import VerifyCodeIcon from '@/assets/auth/verify-code-icon.svg?react';
import MailIcon from '@/assets/common/mail-icon.svg?react';
import NicknameIcon from '@/assets/lecture/person-icon.svg?react';
import ConfirmPasswordIcon from '@/assets/lecture/unit-lock-icon.svg?react';
import PasswordIcon from '@/assets/modal/lock-icon.svg?react';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconType?: 'email' | 'password' | 'confirmPassword' | 'nickname' | 'verifyCode';
  iconSize?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ iconType, iconSize = '', className = '', ...props }, ref) => {
    const getIcon = () => {
      switch (iconType) {
        case 'email':
          return MailIcon;
        case 'password':
          return PasswordIcon;
        case 'confirmPassword':
          return ConfirmPasswordIcon;
        case 'nickname':
          return NicknameIcon;
        case 'verifyCode':
          return VerifyCodeIcon;
        default:
          return null;
      }
    };

    const Icon = getIcon();

    return (
      <div className="relative w-full">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Icon className={`${iconSize} text-text-base`} />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full h-12.5 rounded-2xl border border-input-default-border bg-input-default-bg px-[43px] 
            text-input-default-text text-sm placeholder:text-placeholder-text outline-none
            focus:border-input-focus-border focus:ring-1 focus:ring-input-focus-ring transition-all

            disabled:cursor-not-allowed disabled:border-input-disabled-border disabled:bg-input-disabled-bg disabled:text-input-disabled-text

            ${!Icon ? 'px-4' : ''} 
            ${className}
          `}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
