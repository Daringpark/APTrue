'use client'
import { useFormStatus } from 'react-dom';

export default function LoginButton({name}: {name:string}) {

    const {pending} = useFormStatus();

    return (
        <button
        type='submit'
        disabled={pending}
        >
            로그인
        </button>
    )

}