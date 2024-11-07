'use client';

import styles from './LoginForm.module.scss';
import { signInWithCredentials } from '@/app/serverActions/auth';
import { useFormState } from 'react-dom';
import LoginButton from './LoginButton';
// import { FormEventHandler, useState } from 'react';

// import { signIn } from '@/auth'; // 서버 환경에서는 이거 써야함!
// import { signIn } from 'next-auth/react'; // 클라이언트 환경에서는 이걸 써야함


export default function LoginForm() {

    const [state, action] = useFormState(signInWithCredentials, {
        message:''
    })

    return (
        <form action={action} className={styles.container}>
            <div className={styles.label}>아이디</div>
            <input 
            name='account'
            type="text"
            placeholder='아이디를 입력하세요'
            />

            <div className={styles.label}>비밀 번호</div>
            <input 
            name='password'
            type='password'
            placeholder='비밀번호를 입력하세요'
            />
            <LoginButton name='로그인' />

            <div className={styles.error}>
                {state.message}
            </div>
        </form>

    )
}