import styles from './LoginBackground.module.scss'

export default function LoginBackground() {

    return (
        <div className={styles.container}>
            <img src="/icons/loginIcon.png" alt="" />
            <div>아파트의 진실을 알고 싶다면</div>
            <div>아파트루<span>(APTrue.)!</span></div>
        </div>
    )
}