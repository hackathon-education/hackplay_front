import MailIcon from '@/assets/common/mail-icon.svg?react';
import LockIcon from '@/assets/modal/lock-icon.svg?react';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  iconType?: 'email' | 'password';
  iconSize?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ iconType, iconSize = '', className = '', ...props }, ref) => {
    const Icon = iconType === 'email' ? MailIcon : iconType === 'password' ? LockIcon : null;

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
