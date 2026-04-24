import { ButtonHTMLAttributes, ReactNode } from 'react';

const SIZES = {
  wfullh50: 'w-full h-[50px]',
  wfullh42: 'w-full h-[42px]',
  w74h43: 'w-[74px] h-[43px]',
  none: '',
} as const;

const ROUNDED = {
  sm: 'rounded-[10px]',
  default: 'rounded-[12px]',
  md: 'rounded-[14px]',
  lg: 'rounded-[16px]',
  full: 'rounded-full',
  none: '',
} as const;

type ButtonSize = keyof typeof SIZES;
type ButtonRounded = keyof typeof ROUNDED;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: ButtonSize;
  rounded?: ButtonRounded;
}

const Button = ({
  children,
  disabled,
  size = 'none',
  rounded = 'lg',
  className = '',
  ...props
}: ButtonProps) => {
  const baseStyle = 'font-medium text-sm transition-all';
  const activeStyle =
    'bg-btn-default-bg hover:bg-btn-default-bg-hover cursor-pointer text-btn-default-text font-semibold';
  const disabledStyle = 'bg-btn-disabled-bg cursor-not-allowed text-btn-disabled-text';

  return (
    <button
      disabled={disabled}
      className={`${baseStyle} ${SIZES[size]} ${ROUNDED[rounded]} ${disabled ? disabledStyle : activeStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
