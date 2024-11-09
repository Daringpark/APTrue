"use client"

import { useState } from "react";
import styles from "./Input.module.scss";

export default function AppInput({
    label, 
    placeholder,
    size,
    onChange
} : {
    label : string;
    placeholder : string; 
    size:string;
    onChange: (inputValue:string) => void;
}) { 

    const [inputValue, setInputValue] = useState<string>(""); 

    const onChangeInputValue = (event : React.ChangeEvent<HTMLInputElement>) => {

        const value = event.target.value;
        setInputValue(value);
        onChange(value);
    }

    return (
        <div className={styles.container}>
            <div className={styles.label}>
                {label.split('').map((char, index) => (
                    <span key={index}>{char}</span>
                ))}
            </div>
            <input 
            type="text" 
            value={inputValue} 
            placeholder={placeholder} 
            onChange={onChangeInputValue}
            />
        </div>
    )
}