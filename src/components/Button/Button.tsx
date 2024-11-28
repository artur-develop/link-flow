import React, {ReactNode} from 'react';

interface Button {
  children: ReactNode;
  variant?: 'purple' | 'grey';
  position?: 'left' | 'right' | 'center' | 'single';
  border?: boolean;
  onClick: () => void;
}

const getButtonBorder = (position: 'left' | 'right' | 'center' | 'single', border: boolean) => {
  if (!border) return;
  switch (position) {
    case 'left':
      return 'rounded-l-lg border border-r-0'; // Left button styling
    case 'right':
      return 'rounded-r-lg border border-l-0'; // Right button styling
    case 'center':
      return 'border border-l border-r'; // Middle button styling
    case 'single':
      return 'rounded border'; // Single button styling
    default:
      return ''; // Default fallback (no styling)
  }
};


const Button = (props: Button) => {
  const {
    children,
    variant = 'grey', // TODO
    position = 'single',
    border = true,
    onClick,
  } = props;

  return (
    <button
      className={`px-4 py-2 ${getButtonBorder(position, border)} font-semibold bg-white text-sm`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export {Button};