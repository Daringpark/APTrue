import Link from "next/link";
import styles from './page.module.scss'

export default function Page() {


    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <img src="./icons/completeIcon.png" alt="" />
                <div>업로드 완료!</div>
            </div>
            <div className={styles.content}>
                <div>처리가 완료되면</div>
                <div>알림을 보내드릴게요!</div>
            </div>
            <Link 
            href='/entrance'
            className={styles.button}
            >닫기
            </Link>
        </div>
    )
}