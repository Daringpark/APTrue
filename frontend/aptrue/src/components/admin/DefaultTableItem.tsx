import styles from './Table.module.scss';
import classNames from 'classnames';

export default function DefaultTableItem({id}:{id:number}) {

    return (
        <div className={ classNames(
            styles.container, styles.isTableItem
            )}>
            <div className={styles.no}>{id}</div>
            <div className={styles.name}></div>
            <div className={styles.id}></div>
            <div className={styles.password}></div>
            <div className={styles.phoneNumber}></div>
            <div className={styles.date}></div>
            <div className={styles.blank}>
            </div>
        </div>
    )
}