import styles from './Table.module.scss';
import classNames from 'classnames';

export default function TableColumn() {

    return (
        <div className={ classNames(
            styles.container, styles.isColumnName
            )}>
            <div className={styles.no}>No</div>
            <div className={styles.name}>이름</div>
            <div className={styles.id}>아이디</div>
            <div className={styles.password}>비밀번호</div>
            <div className={styles.phoneNumber}>전화번호</div>
            <div className={styles.date}>등록일</div>
            <div className={styles.blank}><span></span></div>
        </div>
    )
}