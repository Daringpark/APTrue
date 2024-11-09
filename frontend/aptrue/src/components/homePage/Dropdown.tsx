'use client';

import { useState } from 'react';
import style from './Dropdown.module.scss';

interface DropdownProps {
  setSelectedFilter: (filter: string) => void;
}

export default function Dropdown({ setSelectedFilter }: DropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>('전체');

  const options = ['전체', '미완료', '완료', '긴급'];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectOption = (option: string) => {
    setSelectedOption(option);
    setSelectedFilter(option); // 부모 컴포넌트의 필터 상태 업데이트
    setIsOpen(false);
  };

  return (
    <div className={style.dropdown}>
      <div onClick={toggleDropdown} className={style.dropdownButton}>
        {selectedOption}
        <img src="/icons/down_arrow.png" alt="화살표" />
      </div>
      {isOpen && (
        <ul className={style.dropdownMenu}>
          {options.map((option) => (
            <li
              key={option}
              onClick={() => selectOption(option)}
              className={`${style.dropdownItem} ${
                selectedOption === option ? style.selected : ''
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
