import React, {ReactNode} from 'react';

interface Button {
  children: ReactNode;
  variant?: 'purple' | 'grey';
  position?: 'left' | 'right' | 'center' | 'single';
  border?: boolean;
  onClick: () => void;
  className?: string;
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

const Button = (props: Button) => {
  const {
    children,
    variant = 'grey',
    position = 'single',
    border = true,
    onClick,
    className = '',
  } = props;

  const baseClasses = 'w-fit px-4 py-2 font-semibold text-sm inline-flex items-center justify-center';
  const borderClasses = getButtonBorder(position, border);
  const variantClasses = variant === 'purple' 
    ? 'bg-purple-500 text-white hover:bg-purple-600 rounded-lg' 
    : 'bg-white hover:bg-gray-100';

  return (
    <button
      className={`${baseClasses} ${borderClasses} ${variantClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export {Button};