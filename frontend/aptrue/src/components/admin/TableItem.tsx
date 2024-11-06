import styles from './Table.module.scss';
import classNames from 'classnames';
import {format} from 'date-fns';
import { ko } from 'date-fns/locale';
import Button from '../common/button/Button';
import { Admin } from '@/types/admin';

export default function TableItem({
    adminId,
    name,
    account,
    password,
    phone,
    createdAt
} : Admin) {

    return (
        <div className={ classNames(
            styles.container, styles.isTableItem
            )}>
            <div className={styles.no}>{adminId}</div>
            <div className={styles.name}>{name}</div>
            <div className={styles.id}>{account}</div>
            <div className={styles.password}>{password}</div>
            <div className={styles.phoneNumber}>{phone}</div>
            <div className={styles.date}>{format(createdAt, 'yyyy-MM-dd', {locale: ko})}</div>
            <div className={styles.blank}>
                <Button size='webTiny' color='red'>
                    삭제
                </Button>
            </div>
        </div>
    )
}