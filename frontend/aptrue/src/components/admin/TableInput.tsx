"use client"

import styles from './Table.module.scss';
import classNames from 'classnames';
import {format} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import Button from '../common/button/Button';
import Cookies from 'js-cookie';
import { revalidateTag } from 'next/cache';

function formatPhoneNumber(value:string) {

    const phoneNumber = value.replace(/\D/g, ''); // 숫자만 남기기

     // 전화번호 길이에 따라 포맷팅 적용
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 7) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 7)}-${phoneNumber.slice(7, 11)}`;

};

export default function TableInput() {

    const accessToken = Cookies.get('accessToken');

    const [message, setMessage] = useState<string>('');
    const [newAdmin, setNewAdmin] = useState<PostAdmin>({
        name:'',
        account:'',
        password:'',
        phone:''
    })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setNewAdmin((prevData) => ({
            ...prevData,
            [name]: name === 'phone' ? formatPhoneNumber(value) : value
        }));

    }

    const submitNewAdmin = async () => {

        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(newAdmin),
            credentials: 'include' // 쿠키를 포함해 서버와 통신(서버와의 인증을 위한 설정)
        });

        const result = await response.json();

        if (result.status === 200 && result.code==="A005") {
            console.log(result.message) //  "새로운 관리자를 등록했습니다."
            // revalidateTag('adminList'); // adminList 캐시 태그가 붙은 모든 항목을 무효화(클라이언트 컴포넌트에서 작동하지 않음)

        } else if (result.code === "E003") {
            setMessage(result.message)
            console.log('이미 등록된 관리자')

        } else {
            console.log('관리자 등록 실패')
        }
    }

    return (
        <div className={ classNames(
            styles.container, styles.isTableInput
            )}>
            <div className={styles.no}>
                <img src="/icons/plusIcon.png" alt="" />
            </div>
            <div className={styles.name}>
                <input 
                type="text" 
                name="name"
                value={newAdmin.name}
                placeholder='이름' 
                onChange={handleChange}
                />
            </div>
            <div className={styles.id}>
                <input 
                type="text" 
                name="account"
                value={newAdmin.account}
                placeholder='아이디' 
                onChange={handleChange}
                />
            </div>
            <div className={styles.password}>
                <input 
                type="text" 
                name="password"
                value={newAdmin.password}
                placeholder='비밀번호' 
                onChange={handleChange}
                />
            </div>
            <div className={styles.phoneNumber}>
                <input 
                type="text" 
                name="phone"
                value={newAdmin.phone}
                placeholder='전화번호' 
                onChange={handleChange}
                />
            </div>
            <div className={styles.date}>
                <input 
                type="text" 
                placeholder='등록일' 
                value={format( new Date(), "yyyy-MM-dd", {locale:ko})}
                readOnly
                />
            </div>
            <div className={styles.blank}>
                <Button 
                size='webTiny' 
                color='blue' 
                onClick={submitNewAdmin} 
                disabled={!newAdmin.name.trim() || !newAdmin.account.trim() || !newAdmin.password.trim() || !newAdmin.phone.trim()}
                >
                    등록
                </Button>
            </div>
        </div>
    )
}