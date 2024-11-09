'use client'
import { useFormStatus } from 'react-dom';
import styles from './LoginButton.module.scss'

export default function LoginButton({name}: {name:string}) {

    const {pending} = useFormStatus();

    return (
        <button
        type='submit'
        disabled={pending}
        className={styles.button}
        >
            로그인
        </button>
    )

}