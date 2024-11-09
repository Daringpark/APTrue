'use client';

import { useState } from 'react';
import styles from './Input.module.scss';

export default function GeneralInput({
  label,
  placeholder,
  value,
  size,
  onChange,
}: {
  label: string;
  placeholder?: string;
  value: string;
  size: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        {label.split('').map((char, index) => (
          <span key={index}>{char}</span>
        ))}
      </div>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={size === 'long' ? styles.long : styles.short}
      />
    </div>
  );
}
