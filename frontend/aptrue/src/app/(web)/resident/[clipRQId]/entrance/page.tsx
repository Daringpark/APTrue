import { Suspense } from "react";
import PasswordInput from "@/components/resident/PasswordInput";
import styles from './page.module.scss'

export default function Page() {

    return (
        <div className={styles.layout}>
            <div className={styles.container}>
                <div className={styles.title}>사진 업로드 비밀번호 확인</div>
                <div className={styles.content}>사진 업로드를 위해 비밀번호를 확인해주세요</div>
                <Suspense fallback={<div>Loading...</div>}>
                    <PasswordInput/>
                </Suspense>
            </div>
        </div>
    )

}