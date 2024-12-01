import React, {ReactNode} from 'react';

interface Button {
  children: ReactNode;
  variant?: 'purple' | 'grey' | 'purpleOutlined';
  position?: 'left' | 'right' | 'center' | 'single';
  border?: boolean;
  onClick?: (e: React.FormEvent) => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

const getButtonBorder = (position: 'left' | 'right' | 'center' | 'single', border: boolean) => {
  if (!border) return;
  switch (position) {
    case 'left':
      return 'rounded-l-lg border border-r-0';
    case 'right':
      return 'rounded-r-lg border border-l-0';
    case 'center':
      return 'border border-l border-r';
    case 'single':
      return 'rounded border';
    default:
      return '';
  }
};

const baseClasses = 'w-fit px-4 py-2 font-semibold text-sm inline-flex items-center justify-center gap-x-1';

const variantStyles = {
  purple: 'bg-purple-500 text-white hover:bg-purple-600 rounded-lg',
  purpleOutlined: 'bg-white text-purple-500 border-purple-500 hover:bg-purple-50 rounded-lg',
  grey: 'bg-white hover:bg-gray-100'
};

const Button = (props: Button) => {
  const {
    children,
    variant = 'grey',
    position = 'single',
    border = true,
    onClick,
    className = '',
    type = 'button',
    disabled = false,
  } = props;

  return (
    <button
      type={type}
      className={`${baseClasses} ${getButtonBorder(position, border)} ${variantStyles[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export {Button};