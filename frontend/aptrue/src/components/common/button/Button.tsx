import style from '@/components/common/button/Button.module.scss';
import { useState } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color: ButtonColor;
  size: ButtonSize;
  clickedColor?: ButtonColor;
  active?: boolean;
}

export default function Button({
  size,
  color,
  children,
  clickedColor,
  active,
  ...props
}: ButtonProps) {
  const currentColor: ButtonColor =
    active && clickedColor ? clickedColor : color;

  return (
    <button
      className={`${style['base-button-style']} ${style[currentColor]} ${style[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
