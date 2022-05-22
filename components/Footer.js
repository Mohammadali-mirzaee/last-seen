import styles from '../styles/components/Footer.module.scss'
import Image from 'next/image';


const Footer = () => {

    return (
        <footer id={styles.Footer}>
            <div className={styles.logoVy}>
                <Image
                    src='/logo/S3.svg'
                    height={150}
                    width={150}
                    alt="My Awesome Image"
                />
            </div>


            <div className={styles.container}>
                <ul>
                    <li>
                        <a href="">Instagram</a>
                    </li>
                    <li>
                        <a href="">Facebbok</a>
                    </li>
                    <li>
                        <a href="">Linkden</a>
                    </li>
                </ul>

            </div>
            <div className={styles.social}>
                <p>Copyright @ 2021. All Right Reserved</p>
            </div>

        </footer >
    )
}

export default Footer