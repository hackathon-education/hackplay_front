import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button = ({ children, disabled, className = '', ...props }: ButtonProps) => {
  const baseStyle = 'w-full h-12.5 font-semibold text-sm rounded-2xl transition-all';
  const activeStyle =
    'bg-btn-default-bg hover:bg-btn-default-bg-hover cursor-pointer text-btn-default-text';
  const disabledStyle = 'bg-btn-disabled-bg cursor-not-allowed text-btn-disabled-text';

  return (
    <button
      disabled={disabled}
      className={`${baseStyle} ${disabled ? disabledStyle : activeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
