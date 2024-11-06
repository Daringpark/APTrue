"use client"

import styles from './Table.module.scss';
import classNames from 'classnames';
import {format} from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import Button from '../common/button/Button';
import { postAdmin } from '@/types/admin';

export default function TableInput() {

    const [newAdmin, setNewAdmin] = useState<postAdmin>({
        name:'',
        account:'',
        password:'',
        phone:''
    })
    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;

        setNewAdmin((prevData) => ({
            ...prevData,
            [name]:value
        }))

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
                <Button size='webTiny' color='blue'>
                    등록
                </Button>
            </div>
        </div>
    )
}